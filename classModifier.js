/**
 * Created by Lykov Roman on 02.09.2015.
 *
 * @constructor
 * @this {ClassModifier}
 *
 * Принцип работы как у JQuery, цепочка вызовов через точку: CM.nod('body').cmlz()
 */
'use strict';


function ClassModifier(){
    var elements = {},
        element,
        i;

    /**
     * Получает все элементы, удовлетворяющие CSS-селектору css.
     *
     * @this {ClassModifier}
     * @param {string} selector CSS-селектор.
     * @return {ClassModifier}
     */
    this.nod = function(selector){
        elements = document.querySelectorAll(selector);
        return this;
    };


    /**
     * Без параметров получает текущее значения атрибута class, c параметром добавляет значение в атрибут.
     *
     * @this {ClassModifier}
     * @param {string} cls устанавливает класс для нашей выборки.
     * Без параметров получает класс используя метод .cls() вы получите значения класса только первого элемента из всех выбранных. Если вам нужны значения всех элементов, то следует использовать перебор.
     * @return {ClassModifier}
     */
    this.cls = function(cls){
        if(!arguments.length){
            console.log(elements[0].classList.toString());

        } else {
            for (i = 0; i < elements.length; i++) {
                element = elements[i];
                element.classList.add(cls);
            }
        }
        return this;
    };

    /**
     * Удаляет текущие значения атрибута class, c параметром удаляет только конкретное значение из атрибута.
     *
     * @this {ClassModifier}
     * @param {string} cls удаляет класс для нашей выборки.
     * Без параметров удаляет все классы используя метод .rmCls() вы получите чистый атрибут class для всей выборки.
     * * @return {ClassModifier}
     */
    this.rmCls = function(cls){
        if(!arguments.length){
            for (i = 0; i < elements.length; i++) {
                element = elements[i];
                element.setAttribute('class', '');
            }
        } else {
            for (i = 0; i < elements.length; i++) {
                element = elements[i];
                element.classList.remove(cls);
            }
        }
        return this;
    };


    /**
     * Разбирает строку и менят синтаксис 'class-name class2-name' на 'className class2Name'
     *
     * @param {string} str строка для преобразования.
     * @return {string} str преобразованная строка.
     */
    function camelize(str){
        var arr = str.split('-');
        for(var i = 1; i < arr.length; i++){
            var newItem = arr[i].charAt(0).toUpperCase();
            newItem +=  arr[i].slice(1);
            arr[i] = newItem;
        };
        str = arr.join('');
        return str
    };

    /**
     * Преобразует классы "такого-вида" в классы "такогоВида"
     *
     * @this {ClassModifier}
     * @return {ClassModifier}
     */
    this.cmlz = function(){
        for (i = 0; i < elements.length; i++) {
            element = elements[i];
            element.setAttribute('class', camelize(element.getAttribute('class')));
        }
        return this;
    };

    return this;
}

window.CM = new ClassModifier();
