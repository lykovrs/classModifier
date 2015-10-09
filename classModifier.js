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
    this.elements = {};
    this.element = null;
    return this;
}

/**
 * Получает все элементы, удовлетворяющие CSS-селектору css.
 *
 * @this {ClassModifier}
 * @param {string} selector CSS-селектор.
 * @return {ClassModifier}
 */
ClassModifier.prototype.nod = function(selector){
    this.elements = document.querySelectorAll(selector);
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
ClassModifier.prototype.cls = function(cls){
    var elements = this.elements,
        element = this.element;
    if(!arguments.length){
        console.log(elements[0].classList.toString());

    } else {
        for (var i = 0; i < elements.length; i++) {
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
ClassModifier.prototype.rmCls = function(cls){

    if(!arguments.length){
        for (var i = 0; i < this.elements.length; i++) {
            this.element = this.elements[i];
            this.element.setAttribute('class', '');
        }
    } else {
        for (i = 0; i < this.elements.length; i++) {
            this.element = this.elements[i];
            this.element.classList.remove(cls);
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
ClassModifier.prototype.camelize = function(str){
    var arr = str.split('-');
    for(var i = 1; i < arr.length; i++){
        var newItem = arr[i].charAt(0).toUpperCase();
        newItem +=  arr[i].slice(1);
        arr[i] = newItem;
    }
    str = arr.join('');
    return str
};

/**
 * Преобразует классы "такого-вида" в классы "такогоВида"
 *
 * @this {ClassModifier}
 * @return {ClassModifier}
 */
ClassModifier.prototype.cmlz = function(){

    var elements = this.elements;

    for (var i = 0; i < elements.length; i++) {
        this.element = elements[i];
        this.element.setAttribute('class', this.camelize(this.element.getAttribute('class')));
    }
    return this;
};
