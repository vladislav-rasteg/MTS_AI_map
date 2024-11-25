import s from "./Registration.module.scss"
import { Button } from "shared/ui/Button"
import { TextInput } from "shared/ui/TextInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRegistrationMutation } from "shared/api/ProfileAPI"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { LOGIN_ROUTE } from "shared/utils/consts"
import { InputGroup } from "shared/ui/InputGroup"
import { useState } from "react"
import MailIcon from "shared/assets/mail.svg"
import Logo from "shared/assets/logo.svg"
import { Checkbox } from "src/shared/ui/Checkbox"

const formSchema = z.object({
    email: z.string().email({message: "Почта указана неверно"}),
    name: z.string().min(2, {message: "Имя должно быть длинне 2 символов"}),
    dob: z.string().date("Дата указана неверно"),
    agreement: z.boolean({message: "Обязательное поле"})
})

type FormFields = z.infer<typeof formSchema>

export const Registration = () => {
    const { 
        register, 
        handleSubmit,
        control,
        setError,
        formState: { errors }
     } = useForm<FormFields>({
        resolver: zodResolver(formSchema)
     })

    const [registration, { isLoading: registrationLoading }] = useRegistrationMutation();

    const [isMailSent, setIsMailSent] = useState(false)

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        registration({ userData: {...data, session: localStorage.getItem("session") || undefined} })
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
                                    {...register("name")} 
                                    error={errors.name?.message}
                                    placeholder="Ваше имя"
                                    type="text"
                                    on_color
                                    fullWidth
                                />
                                <TextInput 
                                    {...register("email")} 
                                    error={errors.email?.message}
                                    placeholder="Email"
                                    type="text"
                                    on_color
                                    fullWidth
                                />
                                <TextInput 
                                    {...register("dob")} 
                                    error={errors.dob?.message}
                                    placeholder="Дата рождения"
                                    type="date"
                                    on_color
                                    fullWidth
                                />
                                
                                <div className={s.checkbox}>
                                    <Checkbox 
                                        control={control}
                                        {...register("agreement")}
                                        error={errors.agreement?.message ? true : false}
                                    />
                                    Принимаю пользовательское соглашение
                                </div>
                                
                                {errors.root && <p className={s.formError}>{errors.root.message}</p>}
                            </InputGroup>
                            {
                                isMailSent &&
                                <div className={s.mail}>
                                    <img src={MailIcon} alt="Иконка почты"/>
                                    Ссылка для входа отправлена на почту
                                </div>
                            }
                            <Button disabled={registrationLoading} isLoading={registrationLoading} fullWidth type="submit" theme="dark" color="secondary">Регистрация</Button>
                        </InputGroup>
                    </InputGroup>
                </form>
                
            </div>
            <div className={s.container}>
                <div></div>
                <div></div>
                <Link to={LOGIN_ROUTE} className={s.recovery}>Уже есть аккаунт? <span>Войти</span></Link>
                <div></div>
            </div>
        </div>
    )
}