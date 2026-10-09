/* =====================================================
   ELORA PRODUCT CATCH GAME
   ONE PLAYER = ONE GAME
===================================================== */


/* =====================================================
   PRODUCTS
===================================================== */

const products = [
    {
        id: 1,
        name: "ELORA Trimmer",
        image: "image/product01.png.png",
        mrp: 999,
        offer: 499,
        letter: "A",
        amazon: "https://www.amazon.in/",
        glow: "#00eaff"
    },

    {
        id: 2,
        name: "ELORA Blender",
        image: "image/product02.png.png",
        mrp: 1499,
        offer: 799,
        letter: "B",
        amazon: "https://www.amazon.in/",
        glow: "#ff7a00"
    },

    {
        id: 3,
        name: "ELORA Hair Trimmer",
        image: "image/product03.png.png",
        mrp: 1199,
        offer: 599,
        letter: "C",
        amazon: "https://www.amazon.in/",
        glow: "#784cff"
    },

    {
        id: 4,
        name: "image/product04.png.jpg",
        image: "image/product04.png.jpg",
        mrp: 1799,
        offer: 899,
        letter: "D",
        amazon: "https://www.amazon.in/",
        glow: "#00ff9d"
    },

    {
        id: 5,
        name: "ELORA Trimmer QW",
        image: "image/product05.png.png",
        mrp: 1299,
        offer: 649,
        letter: "E",
        amazon: "https://www.amazon.in/",
        glow: "#ff3cac"
    }
];


/* =====================================================
   LOCAL STORAGE KEYS
===================================================== */

const RECORD_KEY = "eloraPlayerRecords";
const PLAYED_KEY = "eloraGamePlayed";


/* =====================================================
   HTML ELEMENTS
===================================================== */

const startScreen =
    document.getElementById("startScreen");

const gameScreen =
    document.getElementById("gameScreen");

const scoreScreen =
    document.getElementById("scoreScreen");

const offersScreen =
    document.getElementById("offersScreen");

const finalScreen =
    document.getElementById("finalScreen");


const playerNameInput =
    document.getElementById("playerName");

const startBtn =
    document.getElementById("startBtn");

const gameArea =
    document.getElementById("gameArea");


const scoreText =
    document.getElementById("score");

const catchText =
    document.getElementById("catchCount");

const targetNameText =
    document.getElementById("targetName");


const scorePopup =
    document.getElementById("scorePopup");


const finalPlayerName =
    document.getElementById("finalPlayerName");

const finalScore =
    document.getElementById("finalScore");

const finalCatch =
    document.getElementById("finalCatch");

const finalTarget =
    document.getElementById("finalTarget");


const nextBtn =
    document.getElementById("nextBtn");


const productsGrid =
    document.getElementById("productsGrid");


const selectedImage =
    document.getElementById("selectedImage");

const selectedName =
    document.getElementById("selectedName");

const selectedMrp =
    document.getElementById("selectedMrp");

const selectedOffer =
    document.getElementById("selectedOffer");

const selectedDiscount =
    document.getElementById("selectedDiscount");


const couponPlayer =
    document.getElementById("couponPlayer");

const couponScore =
    document.getElementById("couponScore");

const sellingCode =
    document.getElementById("sellingCode");

const couponCodeBottom =
    document.getElementById("couponCodeBottom");

const amazonBtn =
    document.getElementById("amazonBtn");


/* =====================================================
   GAME VARIABLES
===================================================== */

let playerName = "";

let score = 0;

let catchCount = 0;

let targetProduct = null;

let activeProducts = [];

let animationId = null;

let gameRunning = false;


/*
   START SPEED
   Higher = faster
*/

let baseSpeed = 10;


/*
   Speed increase after correct catch
*/

const SPEED_INCREASE =8;


/*
   Maximum products on screen
*/

const MAX_PRODUCTS = 9;


/*
   Maximum speed
*/

const MAX_SPEED = 7;


/* =====================================================
   SCREEN CHANGE
===================================================== */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {

            item.classList.remove("active");

        });

    screen.classList.add("active");
}


/* =====================================================
   CHECK ALREADY PLAYED
===================================================== */

function hasAlreadyPlayed() {

    try {

        return (
            localStorage.getItem(
                PLAYED_KEY
            ) === "true"
        );

    } catch (error) {

        return false;

    }
}


/* =====================================================
   START BUTTON
===================================================== */

startBtn.addEventListener(
    "click",
    startGame
);


/* ENTER KEY
===================================================== */

playerNameInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            startGame();

        }

    }
);


/* =====================================================
   START GAME
===================================================== */

function startGame() {

    /*
       ONE PERSON = ONE GAME
    */

    if (hasAlreadyPlayed()) {

        alert(
            "❌ This device has already played the ELORA game."
        );

        return;
    }


    /*
       Get player name
    */

    const enteredName =
        playerNameInput.value.trim();


    if (!enteredName) {

        alert(
            "Please enter your name."
        );

        playerNameInput.focus();

        return;
    }


    /*
       Save player name
    */

    playerName =
        enteredName;


    /*
       LOCK THE GAME IMMEDIATELY

       Once START is pressed,
       player cannot play again
       on this browser/device.
    */

    try {

        localStorage.setItem(
            PLAYED_KEY,
            "true"
        );

    } catch (error) {

        console.log(
            "LocalStorage unavailable."
        );

    }


    /*
       Reset game
    */

    score = 0;

    catchCount = 0;

    targetProduct = null;

    activeProducts = [];

    baseSpeed = 2.5;

    gameRunning = true;


    /*
       Reset screen
    */

    scoreText.textContent = "0";

    catchText.textContent = "0";

    targetNameText.textContent =
        "FIRST TOUCH";


    gameArea.innerHTML = "";


    /*
       Open game
    */

    showScreen(gameScreen);


    /*
       Start products
    */

    startProductFlow();

}


/* =====================================================
   START PRODUCT FLOW
===================================================== */

function startProductFlow() {

    /*
       Five products appear immediately.
    */

    const positions = [

        {
            x: 8,
            y: 40
        },

        {
            x: 68,
            y: 25
        },

        {
            x: 38,
            y: 170
        },

        {
            x: 78,
            y: 310
        },

        {
            x: 15,
            y: 380
        }

    ];


    positions.forEach(
        function(position, index) {

            const product =
                randomProduct();


            createFallingProduct(

                product,

                position.x,

                position.y

            );

        }
    );


    /*
       Start animation
    */

    animationId =
        requestAnimationFrame(
            gameLoop
        );

}


/* =====================================================
   RANDOM PRODUCT
===================================================== */

function randomProduct() {

    const randomIndex =
        Math.floor(
            Math.random() *
            products.length
        );

    return products[randomIndex];

}


/* =====================================================
   CREATE FALLING PRODUCT
===================================================== */

function createFallingProduct(
    product,
    startX,
    startY
) {

    if (!gameRunning) {
        return;
    }


    /*
       Don't exceed 5 products
    */

    if (
        activeProducts.length >=
        MAX_PRODUCTS
    ) {

        return;

    }


    /*
       Create IMAGE
    */

    const element =
        document.createElement("img");


    element.className =
        "falling-product";


    element.src =
        product.image;


    element.alt =
        product.name;


    element.draggable =
        false;


    /*
       Product glow
    */

    element.style.setProperty(
        "--glow",
        product.glow
    );


    /*
       Position
    */

    element.style.left =
        startX + "%";


    element.style.top =
        startY + "px";


    /*
       IMPORTANT:

       Only the PRODUCT IMAGE
       receives pointerdown.
    */

    element.addEventListener(
        "pointerdown",
        handleProductTouch,
        {
            passive: false
        }
    );


    /*
       Prevent image drag
    */

    element.addEventListener(
        "dragstart",
        function(event) {

            event.preventDefault();

        }
    );


    /*
       Add to game
    */

    gameArea.appendChild(
        element
    );


    /*
       Product object
    */

    const object = {

        product: product,

        element: element,

        x: startX,

        y: startY,

        speed:
            baseSpeed *
            (
                0.85 +
                Math.random() * 0.45
            ),

        rotation:
            Math.random() *
            20 - 10,

        rotationSpeed:
            Math.random() *
            1.5 - 0.75,

        scale:
            0.85 +
            Math.random() * 0.25

    };


    activeProducts.push(
        object
    );

}


/* =====================================================
   GAME LOOP
===================================================== */

function gameLoop() {

    if (!gameRunning) {

        return;

    }


    const areaHeight =
        gameArea.clientHeight;


    /*
       Move every product
    */

    for (
        let i =
            activeProducts.length - 1;

        i >= 0;

        i--
    ) {

        const item =
            activeProducts[i];


        /*
           Move down
        */

        item.y +=
            item.speed;


        /*
           Rotate
        */

        item.rotation +=
            item.rotationSpeed;


        /*
           3D movement
        */

        item.element.style.transform =
            `
            translate3d(0,0,0)
            rotateX(5deg)
            rotateY(${item.rotation * 0.4}deg)
            rotateZ(${item.rotation}deg)
            scale(${item.scale})
            `;


        /*
           Update position
        */

        item.element.style.top =
            item.y + "px";


        /*
           Product reaches bottom
        */

        if (
            item.y >
            areaHeight + 150
        ) {

            removeProduct(
                item
            );


            /*
               Immediately replace
            */

            spawnReplacement();

        }

    }


    /*
       Always maintain 5 products
    */

    while (
        activeProducts.length <
        MAX_PRODUCTS
    ) {

        spawnReplacement();

    }


    /*
       Continue animation
    */

    animationId =
        requestAnimationFrame(
            gameLoop
        );

}


/* =====================================================
   SPAWN REPLACEMENT
===================================================== */

function spawnReplacement() {

    if (!gameRunning) {
        return;
    }


    if (
        activeProducts.length >=
        MAX_PRODUCTS
    ) {

        return;

    }


    const product =
        randomProduct();


    const areaWidth =
        gameArea.clientWidth;


    const productWidth =
        window.innerWidth <= 600
            ? 82
            : 105;


    const maxX =
        Math.max(
            10,
            areaWidth -
            productWidth
        );


    const randomX =
        Math.random() *
        maxX;


    /*
       New product enters
       from top.
    */

    createFallingProduct(

        product,

        (
            randomX /
            areaWidth
        ) * 100,

        -150

    );

}


/* =====================================================
   REMOVE PRODUCT
===================================================== */

function removeProduct(item) {

    if (!item) {
        return;
    }


    if (item.element) {

        item.element.remove();

    }


    const index =
        activeProducts.indexOf(
            item
        );


    if (index !== -1) {

        activeProducts.splice(
            index,
            1
        );

    }

}


/* =====================================================
   PRODUCT TOUCH
===================================================== */

function handleProductTouch(event) {

    event.preventDefault();

    event.stopPropagation();


    if (!gameRunning) {
        return;
    }


    /*
       Get exact clicked image
    */

    const element =
        event.currentTarget;


    const item =
        activeProducts.find(
            function(product) {

                return (
                    product.element ===
                    element
                );

            }
        );


    if (!item) {
        return;
    }


    /* =================================================
       FIRST PRODUCT TOUCH

       FIRST TOUCH = TARGET
    ================================================= */

    if (targetProduct === null) {

        targetProduct =
            item.product;


        targetNameText.textContent =
            targetProduct.name;


        /*
           First product also
           gives +5
        */

        correctCatch(
            item
        );


        return;
    }


    /* =================================================
       SAME PRODUCT

       CORRECT
    ================================================= */

    if (
        item.product.id ===
        targetProduct.id
    ) {

        correctCatch(
            item
        );

        return;
    }


    /* =================================================
       DIFFERENT PRODUCT

       GAME OVER
    ================================================= */

    gameOver();

}


/* =====================================================
   CORRECT CATCH
===================================================== */

function correctCatch(item) {

    if (!gameRunning) {
        return;
    }


    /*
       +5 SCORE
    */

    score += 5;


    /*
       Catch count
    */

    catchCount++;


    /*
       Update display
    */

    scoreText.textContent =
        score;

    catchText.textContent =
        catchCount;


    /*
       +5 animation
    */

    showScorePopup();


    /*
       Remove touched product
    */

    removeProduct(
        item
    );


    /*
       Increase speed
    */

    baseSpeed =
        Math.min(
            baseSpeed +
            SPEED_INCREASE,

            MAX_SPEED
        );


    /*
       Spawn new product
    */

    spawnReplacement();

}


/* =====================================================
   SCORE POPUP
===================================================== */

function showScorePopup() {

    scorePopup.classList.remove(
        "show"
    );


    /*
       Restart animation
    */

    void scorePopup.offsetWidth;


    scorePopup.classList.add(
        "show"
    );

}


/* =====================================================
   GAME OVER
===================================================== */

function gameOver() {

    if (!gameRunning) {
        return;
    }


    gameRunning = false;


    /*
       Stop animation
    */

    cancelAnimationFrame(
        animationId
    );


    /*
       Remove all products
    */

    activeProducts.forEach(
        function(item) {

            if (item.element) {

                item.element.remove();

            }

        }
    );


    activeProducts = [];


    /*
       Score board
    */

    finalPlayerName.textContent =
        playerName;


    finalScore.textContent =
        score;


    finalCatch.textContent =
        catchCount;


    finalTarget.textContent =
        targetProduct
            ? targetProduct.name
            : "Not Selected";


    /*
       Save record
    */

    saveRecord();


    /*
       Show score screen
    */

    showScreen(
        scoreScreen
    );

}


/* =====================================================
   NEXT BUTTON
===================================================== */

nextBtn.addEventListener(
    "click",
    openOffers
);


function openOffers() {

    createOfferCards();

    showScreen(
        offersScreen
    );

}


/* =====================================================
   CREATE OFFER CARDS
===================================================== */

function createOfferCards() {

    productsGrid.innerHTML = "";


    products.forEach(
        function(product) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "offer-card";


            /*
               IMAGE
            */

            const image =
                document.createElement(
                    "img"
                );

            image.className =
                "offer-image";

            image.src =
                product.image;

            image.alt =
                product.name;


            /*
               NAME
            */

            const title =
                document.createElement(
                    "h2"
                );

            title.textContent =
                product.name;


            /*
               MRP
            */

            const mrp =
                document.createElement(
                    "div"
                );

            mrp.className =
                "mrp";

            mrp.innerHTML =
                `
                MRP
                <del>
                    ₹${product.mrp}
                </del>
                `;


            /*
               OFFER PRICE
            */

            const price =
                document.createElement(
                    "div"
                );

            price.className =
                "offer-price";

            price.textContent =
                `₹${product.offer}`;


            /*
               DISCOUNT
            */

            const discount =
                document.createElement(
                    "span"
                );

            discount.className =
                "discount";

            discount.textContent =
                calculateDiscount(
                    product.mrp,
                    product.offer
                ) +
                "% OFF";


            /*
               SELECT BUTTON
            */

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "select-btn";

            button.textContent =
                "SELECT PRODUCT";


            button.addEventListener(
                "click",
                function() {

                    selectProduct(
                        product
                    );

                }
            );


            /*
               Add card
            */

            card.appendChild(
                image
            );

            card.appendChild(
                title
            );

            card.appendChild(
                mrp
            );

            card.appendChild(
                price
            );

            card.appendChild(
                discount
            );

            card.appendChild(
                button
            );


            productsGrid.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   DISCOUNT CALCULATION
===================================================== */

function calculateDiscount(
    mrp,
    offer
) {

    return Math.round(

        (
            (mrp - offer) /
            mrp
        ) * 100

    );

}


/* =====================================================
   SELLING CODE
===================================================== */

function generateSellingCode(
    product
) {

    /*
       1 - 10
       = A1

       11 - 20
       = A2

       21 - 30
       = A3
    */

    const level =
        Math.max(
            1,
            Math.ceil(
                score / 10
            )
        );


    return (
        product.letter +
        level
    );

}


/* =====================================================
   SELECT PRODUCT
===================================================== */

function selectProduct(
    product
) {

    /*
       Generate code
    */

    const code =
        generateSellingCode(
            product
        );


    /*
       Product image
    */

    selectedImage.src =
        product.image;


    selectedImage.alt =
        product.name;


    /*
       Product name
    */

    selectedName.textContent =
        product.name;


    /*
       Prices
    */

    selectedMrp.textContent =
        `₹${product.mrp}`;


    selectedOffer.textContent =
        `₹${product.offer}`;


    /*
       Discount
    */

    selectedDiscount.textContent =
        calculateDiscount(
            product.mrp,
            product.offer
        ) +
        "% OFF";


    /*
       Selling code
    */

    sellingCode.textContent =
        code;


    couponCodeBottom.textContent =
        code;


    /*
       Player
    */

    couponPlayer.textContent =
        playerName;


    /*
       Score
    */

    couponScore.textContent =
        score;


    /*
       Amazon link
    */

    if (
        product.amazon &&
        product.amazon.startsWith(
            "https://"
        )
    ) {

        amazonBtn.href =
            product.amazon;

    } else {

        amazonBtn.href =
            "https://www.amazon.in/";

    }


    /*
       Update local record
    */

    updateSelectedRecord(
        product,
        code
    );


    /*
       Final screen
    */

    showScreen(
        finalScreen
    );

}


/* =====================================================
   SAVE PLAYER RECORD
===================================================== */

function saveRecord() {

    const record = {

        name:
            playerName,

        score:
            score,

        catches:
            catchCount,

        target:
            targetProduct
                ? targetProduct.name
                : null,

        selectedProduct:
            null,

        sellingCode:
            null,

        date:
            new Date()
                .toLocaleString()

    };


    try {

        const oldRecords =
            JSON.parse(

                localStorage.getItem(
                    RECORD_KEY
                )

            ) || [];


        oldRecords.push(
            record
        );


        localStorage.setItem(

            RECORD_KEY,

            JSON.stringify(
                oldRecords
            )

        );

    } catch (error) {

        console.log(
            "Could not save player record."
        );

    }

}


/* =====================================================
   UPDATE SELECTED PRODUCT RECORD
===================================================== */

function updateSelectedRecord(
    product,
    code
) {

    try {

        const records =
            JSON.parse(

                localStorage.getItem(
                    RECORD_KEY
                )

            ) || [];


        if (
            records.length === 0
        ) {

            return;

        }


        /*
           Get latest player
        */

        const lastRecord =
            records[
                records.length - 1
            ];


        lastRecord.selectedProduct =
            product.name;


        lastRecord.sellingCode =
            code;


        localStorage.setItem(

            RECORD_KEY,

            JSON.stringify(
                records
            )

        );

    } catch (error) {

        console.log(
            "Could not update record."
        );

    }

}


/* =====================================================
   VIEW ALL RECORDS
===================================================== */

function getELORARecords() {

    try {

        const records =
            JSON.parse(

                localStorage.getItem(
                    RECORD_KEY
                )

            ) || [];


        console.table(
            records
        );


        return records;

    } catch (error) {

        return [];

    }

}


/* =====================================================
   DISABLE IMAGE DRAG
===================================================== */

document.addEventListener(
    "dragstart",
    function(event) {

        if (
            event.target.tagName ===
            "IMG"
        ) {

            event.preventDefault();

        }

    }
);


/* =====================================================
   GAME READY
===================================================== */

console.log(
    "ELORA GAME READY"
);

console.log(
    "One device = One game"
);

console.log(
    "Use getELORARecords() to view saved records."
);