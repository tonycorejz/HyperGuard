import Button from "../../components/Assets/Button";
import PageContainer from "../../components/Assets/PageContainer";
import { useState, useEffect } from 'react'
import { ReCaptcha } from 'react-recaptcha-v3'
import Icon from "../../components/Assets/Icon";
import Router from "next/dist/client/router";

const Recovery = () => {

    return (
        <PageContainer>
            <div className="raise-balance items-center display-flex direction-column non_absolute">
                <div className="container items-center display-flex direction-column">
                    <div className="for-raise-balance for-authorization direction-column">
                        <div className="close-popup display-flex contet-space-b"><h1>Восстановить пароль</h1></div>
                        <form className="for-inputs display-flex direction-column">
                            <input placeholder="Почта" type="email"/>                          
                            <div className="for-captcha">
                                <ReCaptcha
                                    sitekey="6LcU49YdAAAAADXj7cqcgp1cdZomr3bYWGlkYBcQ"
                                    action='action_name'
                                />
                                <Icon src="/assets/img/captcha.svg"/>
                            </div>
                            <Button type="submit" >Зарегистрироваться</Button>
                            <div className="help-text-authorization display-flex contet-space-b">
                                <h6 id="log-to-account" onClick={() => Router.push("/auth/signup")}>Зарегистрироваться</h6>
                                <h6 id="log-to-account" onClick={() => Router.push("/auth/signin")}>Авторизироваться</h6>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
};

export default Recovery;