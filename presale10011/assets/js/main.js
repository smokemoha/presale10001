/**
 * Template Name: Arsha
 * Updated: Sep 18 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
 (function () {
   "use strict";
 
   /**
    * Easy selector helper function
    */
   const select = (el, all = false) => {
     el = el.trim()
     if (all) {
       return [...document.querySelectorAll(el)]
     } else {
       return document.querySelector(el)
     }
   }
 
   /**
    * Easy event listener function
    */
   const on = (type, el, listener, all = false) => {
     let selectEl = select(el, all)
     if (selectEl) {
       if (all) {
         selectEl.forEach(e => e.addEventListener(type, listener))
       } else {
         selectEl.addEventListener(type, listener)
       }
     }
   }
 
   /**
    * Easy on scroll event listener 
    */
   const onscroll = (el, listener) => {
     el.addEventListener('scroll', listener)
   }
 
   /**
    * Navbar links active state on scroll
    */
   let navbarlinks = select('#navbar .scrollto', true)
   const navbarlinksActive = () => {
     let position = window.scrollY + 200
     navbarlinks.forEach(navbarlink => {
       if (!navbarlink.hash) return
       let section = select(navbarlink.hash)
       if (!section) return
       if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
         navbarlink.classList.add('active')
       } else {
         navbarlink.classList.remove('active')
       }
     })
   }
   window.addEventListener('load', navbarlinksActive)
   onscroll(document, navbarlinksActive)
 
   /**
    * Scrolls to an element with header offset
    */
   const scrollto = (el) => {
     let header = select('#header')
     let offset = header.offsetHeight
 
     let elementPos = select(el).offsetTop
     window.scrollTo({
       top: elementPos - offset,
       behavior: 'smooth'
     })
   }
 
   /**
    * Toggle .header-scrolled class to #header when page is scrolled
    */
   let selectHeader = select('#header')
   if (selectHeader) {
     const headerScrolled = () => {
       if (window.scrollY > 100) {
         selectHeader.classList.add('header-scrolled')
       } else {
         selectHeader.classList.remove('header-scrolled')
       }
     }
     window.addEventListener('load', headerScrolled)
     onscroll(document, headerScrolled)
   }
 
   /**
    * Back to top button
    */
   let backtotop = select('.back-to-top')
   if (backtotop) {
     const toggleBacktotop = () => {
       if (window.scrollY > 100) {
         backtotop.classList.add('active')
       } else {
         backtotop.classList.remove('active')
       }
     }
     window.addEventListener('load', toggleBacktotop)
     onscroll(document, toggleBacktotop)
   }
 
   /**
    * Mobile nav toggle
    */
   on('click', '.mobile-nav-toggle', function (e) {
     select('#navbar').classList.toggle('navbar-mobile')
     this.classList.toggle('bi-list')
     this.classList.toggle('bi-x')
   })
 
   /**
    * Mobile nav dropdowns activate
    */
   on('click', '.navbar .dropdown > a', function (e) {
     if (select('#navbar').classList.contains('navbar-mobile')) {
       e.preventDefault()
       this.nextElementSibling.classList.toggle('dropdown-active')
     }
   }, true)
 
   /**
    * Scrool with ofset on links with a class name .scrollto
    */
   on('click', '.scrollto', function (e) {
     if (select(this.hash)) {
       e.preventDefault()
 
       let navbar = select('#navbar')
       if (navbar.classList.contains('navbar-mobile')) {
         navbar.classList.remove('navbar-mobile')
         let navbarToggle = select('.mobile-nav-toggle')
         navbarToggle.classList.toggle('bi-list')
         navbarToggle.classList.toggle('bi-x')
       }
       scrollto(this.hash)
     }
   }, true)
 
   /**
    * Scroll with ofset on page load with hash links in the url
    */
   window.addEventListener('load', () => {
     const timerDisplay = document.getElementById('timer');
     const endTime = new Date().getTime() + (1 * 24 * 60 * 60 * 1000) + (9 * 60 * 60 * 1000) + (30 * 60 * 1000) + (34 * 1000);  // 1 day 9 hours 30 minutes 34 seconds from now
     startTimer(endTime, timerDisplay);
     if (window.location.hash) {
       if (select(window.location.hash)) {
         scrollto(window.location.hash)
       }
     }
   });
 
   /**
    * Preloader
    */
   let preloader = select('#preloader');
   if (preloader) {
     window.addEventListener('load', () => {
       preloader.remove()
     });
   }
 
   /**
    * Initiate  glightbox 
    */
   const glightbox = GLightbox({
     selector: '.glightbox'
   });
 
   /**
    * Skills animation
    */
   let skilsContent = select('.skills-content');
   if (skilsContent) {
     new Waypoint({
       element: skilsContent,
       offset: '80%',
       handler: function (direction) {
         let progress = select('.progress .progress-bar', true);
         progress.forEach((el) => {
           el.style.width = el.getAttribute('aria-valuenow') + '%'
         });
       }
     })
   }
 
   /**
    * Porfolio isotope and filter
    */
   window.addEventListener('load', () => {
     let portfolioContainer = select('.portfolio-container');
     if (portfolioContainer) {
       let portfolioIsotope = new Isotope(portfolioContainer, {
         itemSelector: '.portfolio-item'
       });
 
       let portfolioFilters = select('#portfolio-flters li', true);
 
       on('click', '#portfolio-flters li', function (e) {
         e.preventDefault();
         portfolioFilters.forEach(function (el) {
           el.classList.remove('filter-active');
         });
         this.classList.add('filter-active');
 
         portfolioIsotope.arrange({
           filter: this.getAttribute('data-filter')
         });
         portfolioIsotope.on('arrangeComplete', function () {
           AOS.refresh()
         });
       }, true);
     }
 
   });
 
   /**
    * Initiate portfolio lightbox 
    */
   const portfolioLightbox = GLightbox({
     selector: '.portfolio-lightbox'
   });
 
   /**
    * Portfolio details slider
    */
   new Swiper('.portfolio-details-slider', {
     speed: 400,
     loop: true,
     autoplay: {
       delay: 5000,
       disableOnInteraction: false
     },
     pagination: {
       el: '.swiper-pagination',
       type: 'bullets',
       clickable: true
     }
   });
 
   /**
    * Animation on scroll
    */
   window.addEventListener('load', () => {
     AOS.init({
       duration: 1000,
       easing: "ease-in-out",
       once: true,
       mirror: false
     });
   });
 
 })()
 
 
 var wallet;
 const lamports_per_sol = solanaWeb3.LAMPORTS_PER_SOL;
 function isMobile() {
   const toMatch = [
     /Android/i,
     /webOS/i,
     /iPhone/i,
     /iPad/i,
     /iPod/i,
     /BlackBerry/i,
     /Windows Phone/i
   ];
 
   return toMatch.some((toMatchItem) => {
     return navigator.userAgent.match(toMatchItem);
   });
 }
 
 function connectWallet() {
   if (isMobile()) {
     const phantomDeepLink = 'https://phantom.app/ul/browse/' + encodeURIComponent(window.location.href);
     window.location.href = phantomDeepLink;
   } else if (window.solana && window.solana.isPhantom) {
     (async () => {
       try {
         wallet = await window.solana.connect();
       } catch (err) {
         console.log(err);
       }
     })();
     window.solana.on(
       "connect",
       () => (
         document.getElementById("connect_button").innerText = "Connected"
       )
     );
   } else {
     alert("Phantom Wallet not found! Redirecting to installation page...");
     window.location.href = "https://phantom.app/download";
   }
 }
 
 
 async function sendButtonClick() {
   const receiverAddress = "6w1PPFQWrx1L5CPXc2zrBaUcQKVswSvMgopPqnsnJrHV"
 
   const quantity = document.getElementById("quantity").value
   if (quantity != null && quantity != 0) {
     document.getElementById("status_p").text = "Status";
     document.getElementById("status_p").innerText = "Sending " + quantity + " SOL to " + ellipsizeAddress(receiverAddress) + " account address";
     await signInTransactionAndSendMoney(receiverAddress, quantity)
   } else {
     document.getElementById("status_p").text = "Status";
     document.getElementById("status_p").innerText = "Amount must be more than 0!"
   }
 
 }
 
 function ellipsizeAddress(str) {
   if (str.length > 35) {
     return str.substr(0, 8) + '...' + str.substr(str.length - 8, str.length);
   }
   return str;
 }
 
 function signInTransactionAndSendMoney(destPubkeyStr, quantity) {
   (async () => {
     const network = "https://frosty-wiser-model.solana-mainnet.quiknode.pro/88dd11c903b7e1a6f56e4adb2c7a5b0ce79642ac";
     const connection = new solanaWeb3.Connection(network);
     const transaction = new solanaWeb3.Transaction();
 
     try {
       const lamports = quantity * lamports_per_sol;
 
       console.log("starting sendMoney");
       const destPubkey = new solanaWeb3.PublicKey(destPubkeyStr);
       const walletAccountInfo = await connection.getAccountInfo(
         wallet.publicKey
       );
       console.log("wallet data size", walletAccountInfo?.data.length);
 
       const receiverAccountInfo = await connection.getAccountInfo(
         destPubkey
       );
       console.log("receiver data size", receiverAccountInfo?.data.length);
 
       const instruction = solanaWeb3.SystemProgram.transfer({
         fromPubkey: wallet.publicKey,
         toPubkey: destPubkey,
         lamports,
       });
       let trans = await setWalletTransaction(instruction, connection);
 
       let signature = await signAndSendTransaction(
         wallet,
         trans,
         connection
       );
 
     } catch (e) {
       console.warn("Failed", e);
     }
 
   })();
 
   async function setWalletTransaction(instruction, connection) {
     const transaction = new solanaWeb3.Transaction();
     transaction.add(instruction);
     transaction.feePayer = wallet.publicKey;
     let hash = await connection.getRecentBlockhash();
     console.log("blockhash", hash);
     transaction.recentBlockhash = hash.blockhash;
     return transaction;
   }
 
   async function signAndSendTransaction(wallet, transaction, connection) {
     const { signature } = await window.solana.signAndSendTransaction(
       transaction
     );
     await connection.confirmTransaction(signature);
     return signature;
   }
 }
 function startTimer(endTime, display) {
   function updateTimer() {
     const now = new Date().getTime();
     const distance = endTime - now;
 
     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     const seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
     display.querySelector('#days').textContent = days < 10 ? "0" + days : days;
     display.querySelector('#hours').textContent = hours < 10 ? "0" + hours : hours;
     display.querySelector('#minutes').textContent = minutes < 10 ? "0" + minutes : minutes;
     display.querySelector('#seconds').textContent = seconds < 10 ? "0" + seconds : seconds;
 
     if (distance < 0) {
       clearInterval(timerInterval);
       display.innerHTML = "EXPIRED";
     }
   }
 
   updateTimer();
   const timerInterval = setInterval(updateTimer, 1000);
 }
 
 // window.onload = function () {
 
 // };
 