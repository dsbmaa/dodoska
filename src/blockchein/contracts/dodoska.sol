//SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
 
contract dodoska {

address owner;

struct Product{
    uint id;
    string name;
    string desc;
    uint price;
    string image;
}

struct Basket{
    uint id;
    string name;
    uint quanity;
    uint price;
}

struct check {
    uint id;
    string name;
    uint price;
}

struct Registr {
    string loginUser;
}

enum Role {
    User,
    Meneger,
    Admin
}

struct CheckList {
    string info;
}

mapping (address => Role) public Roles;
mapping (address => Registr) public Registrs;
mapping (address => check) public checks;
mapping (address => Basket[]) public Baskets;
// mapping (address => CheckList) public CheckLists;
mapping (address => Basket[][]) public cheque;


Product[] public Products;

constructor() {
    Roles[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266] = Role.Admin;
    Roles[0x70997970C51812dc3A010C7d01b50e0d17dc79C8] = Role.Meneger;
    owner = msg.sender;
}

modifier onlyAdmin(){
    require(Roles[msg.sender] == Role.Admin);
    _;
}
modifier onlyUser(){
     require(Roles[msg.sender] == Role.User);
    _;
}
modifier onlyMeneger(){
    require(Roles[msg.sender] == Role.Meneger);
    _;
}

function getRole(address signer) public view returns (Role) {
        return Roles[signer];
    }

function viewBasket() public view returns(Basket[] memory) {
    return Baskets[msg.sender];
}
function getCheck() public view returns(Basket[][] memory){
    return cheque[msg.sender];
}

function getBasketTotal(address user) public view returns (uint256) {
    uint256 total = 0;
    for (uint256 i = 0; i < Baskets[user].length; i++) {
        total += Baskets[user][i].price * Baskets[user][i].quanity;
    }
    return total;
}

// юзер
function setProductInBasket(uint256 _index, uint256 _quanity ) public {
    require(_index < Products.length, "There is no such pizza");
    require(_quanity > 0, "Quantity of pizza must be greater than 0");
    require(_quanity < 100, "Quantity of pizza must be less than 100");

    bool alreadyInBasket = false;
    uint indexInBasket;

    for (uint i = 0; i < Baskets[msg.sender].length; i++) {
        if (Baskets[msg.sender][i].id == _index ) {
            alreadyInBasket = true;
            indexInBasket = i;
            break;
        }
    }

        if (alreadyInBasket) {
            Baskets[msg.sender][indexInBasket].quanity += _quanity;
        } else {
            Baskets[msg.sender].push(Basket(Products[_index].id, Products[_index].name, _quanity, Products[_index].price));
        }
}


// Покупка всей корзины
function buyBasket() public payable {
    require(Baskets[msg.sender].length > 0, "Basket is empty");

    uint256 totalPrice = 0;

    for (uint256 i = 0; i < Baskets[msg.sender].length; i++) {
        totalPrice += Baskets[msg.sender][i].price * Baskets[msg.sender][i].quanity;
    }

    require(msg.value >= totalPrice, "Not enough money");

    payable(owner).transfer(totalPrice);

    if (msg.value > totalPrice) {
        payable(msg.sender).transfer(msg.value - totalPrice);
    }
        cheque[msg.sender].push(Baskets[msg.sender]);

        delete Baskets[msg.sender];
}
function viewProducts () public view returns (Product[] memory){
return Products;
}

//менеджер
function addProducts (string memory _name, string memory _desc, uint _price, string memory _image ) public {
    uint id = Products.length; 
    Products.push (Product (id,_name, _desc,_price,_image));
}

function delProduct (uint id) public onlyMeneger {
    if ( id != Products.length - 1) {
    Products[ id] = Products[Products.length - 1];
    }
     Products.pop();
}

function editProduct (uint _id, string memory _name, string memory _desc, uint _price, string memory _image) public onlyMeneger {
    Product storage ProductToUpdate = Products[_id];
    ProductToUpdate.name = _name;
    ProductToUpdate.desc = _desc;
    ProductToUpdate.price = _price;
    ProductToUpdate.image = _image;
}

//админ 
function addMeneger(address user) public onlyAdmin {
    Roles[user] = Role.Meneger;
}

function addAdmin(address user) public onlyAdmin {
    Roles[user] = Role.Admin;
}
 function clearBasket() public {
        delete Baskets[msg.sender];
    }
  

}