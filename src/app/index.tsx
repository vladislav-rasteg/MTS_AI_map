import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CompetitorData {
  Наименование: string;
  Ссылка: string;
  Логотип: string;
  ['Выручка 2021, млн ₽']: number;
  ['Выручка 2022, млн ₽']: number;
  ['Выручка 2023, млн ₽']: number;
  ['CAGR, 2021-2023, %']: string;
  ['Чистая прибыль (убыток) 2023, млн ₽']: number;
}

interface ClientData {
  Наименование: string;
  Отрасль: string;
  Справка: string;
}

interface ConnectionData {
  КомпанияА: string;
  КомпанияБ: string;
  Название: string;
  Ссылка: string;
}

const CompetitorsChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    Promise.all([
      d3.csv('/data/concurents.csv'),
      d3.csv('/data/clients.csv'),
      d3.csv('/data/connections.csv'),
    ]).then(([competitorsData, clientsData, connectionsData]) => {
      const competitors = competitorsData.map(d => ({
        Наименование: d['Наименование'] || '',
        Ссылка: d['Ссылка'] || '',
        Логотип: d['Логотип'] || '',
        ['Выручка 2021, млн ₽']: +d['Выручка 2021, млн ₽']!,
        ['Выручка 2022, млн ₽']: +d['Выручка 2022, млн ₽']!,
        ['Выручка 2023, млн ₽']: +d['Выручка 2023, млн ₽']!,
        ['CAGR, 2021-2023, %']: d['CAGR, 2021-2023, %'] || '',
        ['Чистая прибыль (убыток) 2023, млн ₽']: +d['Чистая прибыль (убыток) 2023, млн ₽']!,
      }));

      const clients = clientsData.map(d => ({
        Наименование: d['Наименование'] || '',
        Отрасль: d['Отрасль'] || '',
        Справка: d['Справка'] || '',
      }));

      const connections = connectionsData.map(d => ({
        КомпанияА: d['Компания А'],
        КомпанияБ: d['Компания Б'],
        Название: d['Название'] || '',
        Ссылка: d['Ссылка'] || '',
      }));

      renderChart(competitors, clients, connections);
    });
  }, []);

  const renderChart = (competitors: CompetitorData[], clients: ClientData[], connections: ConnectionData[]) => {
    const width = window.innerWidth * 1.5;
    const height = window.innerHeight * 1.5;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Удаляем предыдущий контент
    svg.selectAll('*').remove();

    // Добавляем группу для масштабирования и перемещения
    const zoomGroup = svg.append('g');

    // Настройка панорамирования и масштабирования
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        zoomGroup.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Добавляем точки на фон
    const backgroundGroup = zoomGroup.append('g').attr('class', 'background');
    const gridSpacing = 36;
    for (let x = 0; x < width; x += gridSpacing) {
      for (let y = 0; y < height; y += gridSpacing) {
        backgroundGroup
          .append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 1.5)
          .attr('fill', '#ccc')
          .attr('opacity', 0.8);
      }
    }

    const linkGroup = zoomGroup.append('g').attr('class', 'links');

    // Добавляем связи между конкурентами и клиентами
    const links = connections.map(d => {
      const source = clients.find(c => c.Наименование === d.КомпанияА);
      const target = competitors.find(c => c.Наименование === d.КомпанияБ);
      return { source, target };
    }).filter(d => d.source && d.target);

    const linkElements = linkGroup
      .selectAll('line.connection')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'connection')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1);

    // Определяем симуляцию для конкурентов и клиентов с большим расстоянием между группами
    const competitorSimulation = d3.forceSimulation(competitors)
      .force('charge', d3.forceManyBody().strength(50))
      .force('center', d3.forceCenter(width / 4, height / 2))
      .force('collision', d3.forceCollide(d => calculateRadius(d) * 1.2))
      .on('tick', ticked);

    const clientSimulation = d3.forceSimulation(clients)
      .force('charge', d3.forceManyBody().strength(50))
      .force('center', d3.forceCenter((width / 4) * 3, height / 2))
      .force('collision', d3.forceCollide(48))
      .force('x', d3.forceX((width / 4) * 3).strength(0.2)) // Добавляем силу притяжения клиентов к правой стороне
      .force('y', d3.forceY(height / 2).strength(0.2)) // Добавляем силу притяжения клиентов к центру по Y
      .on('tick', ticked)

    clientSimulation.tick(180)

    // Добавляем белые круги для каждой компании (конкуренты и клиенты)
    const competitorNodes = zoomGroup
      .selectAll('circle.competitor')
      .data(competitors)
      .enter()
      .append('circle')
      .attr('class', 'competitor')
      .attr('r', d => calculateRadius(d))
      .attr('fill', '#fff');

    const clientNodes = zoomGroup
      .selectAll('circle.client')
      .data(clients)
      .enter()
      .append('circle')
      .attr('class', 'client')
      .attr('r', 40)
      .attr('fill', '#fff');

    // Добавляем логотипы для конкурентов
    zoomGroup
      .selectAll('image')
      .data(competitors)
      .enter()
      .filter(d => d.Логотип !== '')
      .append('image')
      .attr('xlink:href', d => d.Логотип)
      .attr('width', d => calculateRadius(d) * 1.2)
      .attr('height', d => calculateRadius(d) * 1.2)
      .attr('x', d => (d as any).x - calculateRadius(d) * 0.6)
      .attr('y', d => (d as any).y - calculateRadius(d) * 0.6);

    // Добавляем подписи с названием клиента, если нет логотипа
    zoomGroup
      .selectAll('text.client')
      .data(clients)
      .enter()
      .append('text')
      .attr('class', 'client')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('fill', '#000')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .text(d => d.Наименование);

    // Добавляем подписи с названием конкурента, если нет логотипа
    zoomGroup
    .selectAll('text.competitor')
    .data(competitors)
    .enter()
    .filter(d => d.Логотип === '') // Фильтруем только те данные, у которых нет логотипа
    .append('text')
    .attr('class', 'competitor')
    .attr('font-size', '12px')
    .attr('font-weight', '600')
    .attr('fill', '#000') // Цвет текста
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle') // Выровнять по вертикальному центру
    .each(function (d) {
        // Разделяем название компании по пробелам
        const words = d.Наименование.split(' ');
        const textElement = d3.select(this);

        // Добавляем каждое слово в отдельный <tspan>
        words.forEach((word, i) => {
        textElement.append('tspan')
            .attr('x', 0) // Используем относительное смещение, поэтому X = 0
            .attr('dy', i === 0 ? 0 : '1.2em') // Первая строка на уровне Y, остальные ниже
            .text(word);
        });
    });

    // Обновление позиции элементов
    function ticked() {
        linkElements
          .attr('x1', d => (d.source as any).x)
          .attr('y1', d => (d.source as any).y)
          .attr('x2', d => (d.target as any).x)
          .attr('y2', d => (d.target as any).y);

        competitorNodes
          .attr('cx', d => (d as any).x)
          .attr('cy', d => (d as any).y);
      
        clientNodes
          .attr('cx', d => (d as any).x)
          .attr('cy', d => (d as any).y);
      
        zoomGroup.selectAll('image')
          .attr('x', d => (d as any).x - calculateRadius(d) * 0.6)
          .attr('y', d => (d as any).y - calculateRadius(d) * 0.6);
      
        zoomGroup.selectAll('text.client')
          .attr('x', d => (d as any).x)
          .attr('y', d => (d as any).y);
      
        // Обновляем позицию текста конкурентов
        zoomGroup.selectAll('text.competitor')
          .attr('x', d => (d as any).x)
          .attr('y', d => (d as any).y * 0.99)
          .selectAll('tspan')
          .attr('x', d => (d as any).x); // Оставляем `x` в 0 для центрирования относительно элемента `<text>`
      }
  };

  const calculateRadius = (d: CompetitorData) => {
    return Math.sqrt((10000 + d['Выручка 2023, млн ₽']) / Math.PI) || 50;
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default CompetitorsChart;
