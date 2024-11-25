import { Typography } from "src/shared/ui/Typography";
import s from "./OrganizationCard.module.scss"
import { IOrganization } from "src/feautures/Organization/models";
import { ProgressiveImage } from "src/shared/ui/ProgressiveImage";
import { Button } from "src/shared/ui/Button";
import { LinkIcon } from "src/shared/ui/Icons/LinkIcon";


interface OrganizationCardProps{
    // size?: "small" | "medium"
    organization?: IOrganization
}

export const OrganizationCard = ({ organization }: OrganizationCardProps) => {

    if(!organization){
        return(
            <div>
                no organizer
            </div>
        )
    }

    return (
        <div className={s.block}>
            <div className={s.info}>
                <div className={s.logo}>
                    <ProgressiveImage 
                        src={(organization.icon_link && organization.icon_link.length > 5) ? organization.icon_link : "/assets/organization.svg"}
                        alt="Логотип организатора"
                    />
                </div>
                <Typography variant="p3" color="primary" className={s.name}>{organization.name}</Typography>
            </div>
            <Button className={s.button} iconOnly color="ghost"><LinkIcon className={s.icon} /></Button>
        </div>
    );
};