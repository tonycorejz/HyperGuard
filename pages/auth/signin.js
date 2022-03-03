import Button from "../../components/Assets/Button";
import PageContainer from "../../components/Assets/PageContainer";
import { useState, useEffect } from 'react'
import Router from "next/dist/client/router";

const SignIn = () => {

    return (
        <PageContainer>
                <div className="raise-balance items-center display-flex direction-column non_absolute">
                    <div className="container items-center display-flex direction-column">
                        <div className="for-raise-balance for-authorization direction-column">
                            <div className="close-popup display-flex contet-space-b"><h1>Авторизация</h1></div>
                            <form className="for-inputs display-flex direction-column">
                                <input placeholder="Логин" type="text"/>
                                <input placeholder="Пароль" type="password"/>
                                <Button type="submit">Авторизироваться</Button>
                                <div className="help-text-authorization display-flex contet-space-b">
                                    <h4>Нет аккаунта?</h4>
                                    <h6 id="create-account" onClick={() => Router.push("/auth/signup")}>Создать аккаунт</h6>
                                    <h6 onClick={() => Router.push("/auth/recovery")}>Забыли пароль?</h6>
                                </div>
                            </form>   
                        </div>
                    </div>
                </div>
        </PageContainer>
    )
};

export default SignIn;