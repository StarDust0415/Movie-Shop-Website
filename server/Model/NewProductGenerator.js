var express = require("express");
var mongoose = require("mongoose");
mongoose.connect("mongodb://SimpleMovie:!123456@cluster0-shard-00-00-cikkm.mongodb.net:27017,cluster0-shard-00-01-cikkm.mongodb.net:27017,cluster0-shard-00-02-cikkm.mongodb.net:27017/SimpleMovie?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");
var Product = require('./ProductModel');

var addProduct = function(productName, productDescription, price, imgUrl, salesmanId, type) {
    var newProduct = Product({
        productname: productName,
        productDescription: productDescription,
        price: price,
        imgUrl: imgUrl,
        comments: [],
        salesmanId: (salesmanId),
        type: type
    });
    newProduct.save((err, result) => {
        if (err) return err;
        console.log(result);
    });
};



addProduct("Eggsy's Grey Double-Breasted Wool And Mohair",
    " This Kingsman suit jacket is tailored from wool and mohair-blend cloth sourced from the British textile mill William Halstead. Based on the styles Mr Taron Egerton's character Eggsy favours in the film, it's cut in a double-breasted profile with lightly padded shaped shoulders, frame-broadening peak lapels and full canvassing.",
    1595.0,
    "../../../assets/product/1.jpg",
    "5a1b627144478b019abf94c6",
    "Cloth");

addProduct("Marvel Anime Iron Man Toy",
    "\t▪\tComic-inspired design and premium articulation\n" +
    "\t▪\tIncludes Marvel's Titus Build-a-Figure piece\n" +
    "\t▪\tCollect other Marvel Legends Series figures(each sold separately)\n" +
    "\t▪\tAction figure size: 6 inches\n" +
    "\t▪\tIncludes figure, 2 accessories, and Build - a - Figure part\n",
    42.76,
    "../../../assets/product/2.jpg",
    "5a1b627144478b019abf94c6",
    "Model");

addProduct("Olaf's Castle of Arendelle Play Set",
    " Brighten the winter holidays with our towering Castle of Arendelle. Recreate favorite scenes from Olaf's Frozen Adventure with this three-level play set that includes seven figures, a light-up tree, two sleighs, plus accessories.",
    139.95,
    "../../../assets/product/3.jpg",
    "5a1b627144478b019abf94c6",
    "Model");

addProduct("Héctor Pop! Vinyl Figure-Funko",
    "Celebrate the fantastical wonder of PIXAR's Coco with this Pop! Vinyl Figure featuring the charming trickster skeleton Héctor.",
    12.95,
    "../../../assets/product/4.jpeg",
    "5a1b627144478b019abf94c6",
    "Model");

addProduct("Coco: Stuck on Stories Book",
    "An engaging storybook and board game in one activity kit! Coco: Stuck on Stories offers full-page illustrations, a storybook, and 10 toy suction cups that bring the characters of the PIXAR movie to life and ignite your child's imagination.",
    12.95,
    "../../../assets/product/5.jpeg",
    "5a1b627144478b019abf94c6",
    "Book");

addProduct("Elsa Doll - Olaf's Frozen Adventure",
    "Inspired by Olaf's Frozen Adventure, this collectible Elsa doll is expertly crafted with embroidered and rhinestone details in her exquisite costume. The true-to-movie design is fully poseable and features lifelike braided hair.",
    119.95,
    "../../../assets/product/6.jpeg",
    "5a1b627144478b019abf94c6",
    "Doll");

addProduct("Captain America with Avengers Ringer T-Shirt",
    "Captain America steps forward for a full-color treatment backed by pen-and-ink Avengers on this heroic, heathered ringer tee.",
    16.95,
    "../../../assets/product/7.jpeg",
    "5a1b627144478b019abf94c6",
    "Cloth");

addProduct("Groot Heathered Tank Tee-Guardians of the Galaxy Vol.2",
    "You'll be dancing with the stars in this sheer, vintage-look heathered tank tee with raw-edge accents and adorable little Groot graphics inspired by Marvel's Guardians of the Galaxy Vol 2.",
    22.95,
    "../../../assets/product/8.jpeg",
    "5a1b627144478b019abf94c6",
    "Cloth");

addProduct("BB-8 LEGO - Star Wars: The Last Jedi",
    "Build your very own LEGO BB-8, featuring a wheel-activated rotating head and opening hatch with ''welding torch.'' It also comes with a display stand, decorative fact plaque and small BB-8 figure to show off your friendly droid.",
    119.95,
    "../../../assets/product/9.jpeg",
    "5a1b627144478b019abf94c6",
    "Book");

addProduct("Hulk Smash Fists by Hasbro-Thor: Ragnarok",
    "Get ready for super smashing action with these Hulk Smash Fists. Featuring heroic sound effects inspired by Thor: Ragnarok, these giant green gloves really pack a punch at playtime.",
    29.95,
    "../../../assets/product/10.jpeg",
    "5a1b627144478b019abf94c6",
    "Toy");





