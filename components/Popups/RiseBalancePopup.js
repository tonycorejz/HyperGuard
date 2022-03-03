import React, { useEffect, useState } from "react";
import Button from "../../components/Assets/Button";
import { Dropdown, DropdownBody, DropdownHead } from "../../components/Assets/Dropdown";

const RiseBalancePopup = ({active, setActive}) => {

  return(
    <Dropdown openClass="open open-op">
      <DropdownHead>
        <Button className="insert-balance order-service button-from-history">
          {`Пополнить баланс`}
          <img src="/assets/img/arrow-up-r.svg" class="img-arrow"></img>
        </Button>
      </DropdownHead>

      <DropdownBody>
        <div className="raise-balance items-center display-flex direction-column" id="modal-0">
          <div className="container items-center display-flex direction-column">
            <div className="for-raise-balance direction-column">
              <div className="close-popup display-flex contet-space-b"><h1>Пополнить баланс</h1><img id="close-popup" closeHandler={(currentState) => ({state: !currentState})} src="/assets/img/close_popup.svg"/></div>
                <div className="parametrs-balance display-flex contet-space-b">
                <div className="for-inputs display-flex direction-column">
                    <input placeholder="Сумма пополнения" type="text"/>
                    <input placeholder="Имя и фамилия" type="text"/>
                    <input placeholder="Номер карты" type="text"/>
                    <div className="display-flex contet-space-b">
                        <input placeholder="Срок действия" type="text"/>
                        <input placeholder="CVV" type="text"/>
                    </div>
                </div>
                <div className="for-inputs display-flex direction-column">
                    <label className="option items-center display-flex contet-space-b">
                        <input type="radio" name="select" id="option-1"/>
                        <span className="items-center display-flex"><img src="/assets/img/p.svg"/>Payeer Wallet</span>
                        <div className="dot display-flex"></div>
                    </label>
                    <label className="option contet-space-b items-center display-flex">
                        <input type="radio" name="select" id="option-2"/>
                        <span className="items-center display-flex"><img src="/assets/img/pm.svg"/>Perfect Money</span>
                        <div className="dot display-flex"></div>
                    </label>
                        <label className="option contet-space-b items-center display-flex">
                        <input type="radio" name="select" id="option-3"/>
                        <span className="items-center display-flex"><img src="/assets/img/star.svg"/>AdvCash</span>
                        <div className="dot display-flex"></div>
                    </label>
                </div>
                <div className="for-inputs display-flex direction-column">
                    <button>Пополнить баланс</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DropdownBody>
    </Dropdown>
  )
}

export default RiseBalancePopup;