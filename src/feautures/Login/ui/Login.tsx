import s from "./Login.module.scss"
import { Button } from "shared/ui/Button"
import { TextInput } from "shared/ui/TextInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { useCheckMutation, useLoginMutation } from "shared/api/ProfileAPI"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MAIN_ROUTE, REGISTRATION_ROUTE } from "shared/utils/consts"
import { InputGroup } from "shared/ui/InputGroup"
import QueryString from "qs"
import { useEffect, useState } from "react"
import MailIcon from "shared/assets/mail.svg"
import Logo from "shared/assets/logo.svg"

const formSchema = z.object({
    email: z.string().email({message: "Почта указана неверно"})
})

type FormFields = z.infer<typeof formSchema>

export const Login = () => {
    const { 
        register, 
        handleSubmit,
        setError,
        formState: { errors }
     } = useForm<FormFields>({
        resolver: zodResolver(formSchema)
     })

    const navigate = useNavigate()

    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [check] = useCheckMutation();

    const [isMailSent, setIsMailSent] = useState(false)

    useEffect(() => {
        const [, params] = window.location.href.split('?');
        const parsedParams = QueryString.parse(params);
        if(Object.prototype.hasOwnProperty.call(parsedParams, "hash")){
            check({link_hash: String(parsedParams.hash)})
                .then((res: any) => {
                    if (Object.prototype.hasOwnProperty.call(res, "error")) {
                        toast.error(res.error.data?.message || "Хмм... Что-то пошло не так")
                        setError("root", {
                            message: res.error.data?.message || "Хмм... Что-то пошло не так"
                        })
                    } else {
                        setTimeout(() => {
                            if(Object.prototype.hasOwnProperty.call(parsedParams, "redirect")){
                                navigate(String(parsedParams.redirect))
                            } else {
                                navigate(MAIN_ROUTE)
                            }
                        }, 200)
                    }
                });
        }
    }, [])


    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        login({userData: {...data, session: localStorage.getItem("session") || undefined}})
            .then((res: any) => {
                if (Object.prototype.hasOwnProperty.call(res, "error")) {
                    toast.error(res.error.data?.message || "Хмм... Что-то пошло не так")
                    setError("root", {
                        message: res.error.data?.message || "Хмм... Что-то пошло не так"
                    })
                } else {
                    setIsMailSent(true)
                }
            });
    }


    return(
        <div className={s.login_block}>
            <div className={s.container}>
                <div></div>
                <img src={Logo} alt="Логотип" className={s.logo}/>
            </div>
            <div className={s.login_register}>
                <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup gap="m">
                        <div className={s.select}>
                            <div className={s.user}>
                                Пользователь
                            </div>
                            <Link to="https://prohodka.com/admin" className={s.org}>
                                Организатор
                            </Link>
                        </div>
                        
                        <InputGroup gap="s">
                            <InputGroup gap="s">
                                <TextInput 
                                    {...register("email")} 
                                    error={errors.email?.message}
                                    placeholder="Email"
                                    type="text"
                                    on_color
                                    fullWidth
                                />
                                {errors.root && <p className={s.formError}>{errors.root.message}</p>}
                            </InputGroup>
                            {
                                isMailSent &&
                                <div className={s.mail}>
                                    <img src={MailIcon} alt="Иконка почты"/>
                                    Ссылка для входа отправлена на почту
                                </div>
                            }
                            <Button disabled={loginLoading} isLoading={loginLoading} fullWidth type="submit" theme="dark" color="secondary">Войти</Button>
                        </InputGroup>
                    </InputGroup>
                </form>
                <Button color="ghost" fullWidth onClick={() => navigate(REGISTRATION_ROUTE)}>Зарегистрироваться</Button>
            </div>
            <div className={s.container}>
                <div></div>
                <div></div>
                <Link to="/recovery" className={s.recovery}>Не получается войти?</Link>
                <div></div>
            </div>
        </div>
    )
}