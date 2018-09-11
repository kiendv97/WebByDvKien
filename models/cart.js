    module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                price: 0
            }
        }   
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;

    };
    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id])
        }
        return arr;

    };
    this.update = function (ids, qtys) {
        let map = [];

        Array.prototype.forEach.call(ids, id => {
            Array.prototype.forEach.call(qtys, qty => {

                map.push({
                    id: id,
                    qty: parseInt(qty, 10)
                });
            });
        });

        var i = 0;
        for (const item in this.items) {

            for (let k = 0; k < ids.length; k++) {
                if (i == k) {
                    i++;
                    this.items[item].qty = map[k].qty;
                    break;
                }
            }
        }


        this.update2();




    };
    this.update2 = function () {

        this.totalQty = 0;
        this.totalPrice = 0;
        for (const item in this.items) {
            var storedItem = this.items[item];
            storedItem.price = storedItem.item.price * storedItem.qty;
            this.totalPrice += storedItem.price;
            this.totalQty += this.items[item].qty;
            this.items[item].price = storedItem.price;


        }
    }
    this.delete = function (id) {
        console.log(this.totalQty);

        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
        console.log(this.totalQty);
    };

    this.saveCart = function (req) {
        req.session.cart = this.data
    }

}