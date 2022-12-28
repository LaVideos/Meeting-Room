export const regex = {
    twoWordsBySpace:new RegExp(/^[a-zA-ZА-яіІїЇґҐёЁє`'-]{2,}\s[a-zA-ZА-яіІїЇґҐёЁє`'-]{2,}$/),
    twoWordsBySpaceAndNumbers:new RegExp(/^[a-zA-ZА-я0-9іІїЇґҐёЁє`'-]{2,}\s[a-zA-ZА-яіІїЇґҐёЁє0-9`'-]{2,}$/),
    strongPassword:new RegExp(/^(?=.*[a-zа-яіїґёєу])(?=.*[A-ZА-ЯІЇҐЁЄ])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/),
    incoraEmail:new RegExp(/^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@incorainc.com+$/, "gm"),

}