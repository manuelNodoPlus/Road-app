import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import "firebase/storage";
const config = {
    apiKey: "AIzaSyCiB31w3-oaMiUH2_qKNGa8oKKaaJCz_OU",
    authDomain: "road-1180a.firebaseapp.com",
    databaseURL: "https://tibaplusapp.firebaseio.com/", //https://tibaplusapp.firebaseio.com/
    projectId: "road-1180a",
    storageBucket: "road-1180a.appspot.com",
    messagingSenderId: "1014237379367",
    appId: "1:1014237379367:web:9f07644456a96f593a0702",
    measurementId: "G-STGLN8JZ7E"
};

class FirebaseDBS {
    constructor() {
        app.initializeApp(config);

        /* Helper */

        this.serverValue = app.database.ServerValue;
        this.emailAuthProvider = app.auth.EmailAuthProvider;

        /* Firebase APIs */

        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage();
        /* Social Sign In Method Provider */

        this.googleProvider = new app.auth.GoogleAuthProvider;
        this.facebookProvider = new app.auth.FacebookAuthProvider();
        this.twitterProvider = new app.auth.TwitterAuthProvider();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    doSignInWithFacebook = () =>
        this.auth.signInWithPopup(this.facebookProvider);

    doSignInWithTwitter = () =>
        this.auth.signInWithPopup(this.twitterProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        });

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    // *** Notifications API ***

    notification = uid => this.db.ref(`notifications/${uid}`);

    notifications = () => this.db.ref('notifications');

    // *** Devices API ***

    device = uid => this.db.ref(`devices/${uid}`);

    devices = () => this.db.ref('devices');

    // *** Establishment Storage API ***

    usersDocumentStorage = (uidUser, path, imageName) => this.storage.ref(`/users/${uidUser}/${path}/${imageName}`);

    // *** Chat API ***

    chat = (chatUid) => this.db.ref(`chats/${chatUid}`);

    chats = () => this.db.ref(`chats/`);

    chatMesagges = (chatUid) => this.db.ref(`chats/${chatUid}/messages`);

    // *** UserChats API ***

    userChats = (uidUser) => this.db.ref(`users/${uidUser}/chats/`);

    // *** Establishments API ***chatUid

    establishment = (uidEstablishment) => this.db.ref(`/establishments/${uidEstablishment}`);

    establishments = () => this.db.ref(`/establishments/`);

    // *** EstablishmentChats API ***    

    establishmentsChats = (uidEstablishment) => this.db.ref(`/establishments/${uidEstablishment}/chats/`);

    // *** EstablishmentProducts API ***   

    establishmentProduct = (uidEstablishment, productUid) => this.db.ref(`/establishments/${uidEstablishment}/products/${productUid}/`);

    establishmentProducts = (uidEstablishment) => this.db.ref(`/establishments/${uidEstablishment}/products/`);

    establishmentProductsCategories = (uidEstablishment) => this.db.ref(`/establishments/${uidEstablishment}/productsCategories/`);

    // *** EstablishmentPosts API ***  

    establishmentPost = (uidEstablishment, postUid) => this.db.ref(`/establishments/${uidEstablishment}/posts/${postUid}/`);

    establishmentPosts = (uidEstablishment) => this.db.ref(`/establishments/${uidEstablishment}/posts/`);

    // *** EstablishmentPosts API ***  

    comments = () => this.db.ref(`/coments/`);

    feedbacks = () => this.db.ref(`/feedbacks/`);

    // comments = () => this.db.ref(`/coments/`);


    // *** EstablishmentPosts API ***  



    // *** Establishment Posts Storage API ***

    establishmentPostsStorage = (uidEstablishment) => this.storage.ref(`/establishments/${uidEstablishment}/posts/`);
    // *** Establishment Storage API ***

    establishmentStorage = (uidEstablishment, path, imageName) => this.storage.ref(`/establishments/${uidEstablishment}/${path}/${imageName}`);

    establishmentsStorage = (uidEstablishment) => this.storage.ref(`/establishments/${uidEstablishment}`);

    establishmentProductsStorage = (uidEstablishment) => this.storage.ref(`/establishments/${uidEstablishment}/products/`);

    establishmentPostsStorage = (uidEstablishment) => this.storage.ref(`/establishments/${uidEstablishment}/posts/`);
    // *** Services API ***

    service = (uidService) => this.db.ref(`/services/${uidService}`);

    services = () => this.db.ref(`/services/`);

    // *** EstablishmentPosts API ***  

    servicePost = (uidService, postUid) => this.db.ref(`/services/${uidService}/posts/${postUid}/`);

    servicePosts = (uidService) => this.db.ref(`/services/${uidService}/posts/`);

    // *** ServiceChats API ***    

    servicesChats = (uidService) => this.db.ref(`/services/${uidService}/chats/`);

    // *** Services Storage API ***

    serviceStorage = (uidService, path, imageName) => this.storage.ref(`/services/${uidService}/${path}/${imageName}`);

    servicesStorage = (uidService) => this.storage.ref(`/services/${uidService}`);

    // *** Donations API ***

    donationEnroll = (uidDonation) => this.db.ref(`/donations/enrolls/${uidDonation}`);

    donationsEnroll = () => this.db.ref(`/donations/enrolls`);

    donationDonate = (uidDonation) => this.db.ref(`/donations/donations/${uidDonation}`);

    donationsDonate = () => this.db.ref(`/donations/donations`);

    // // *** Donations Storage API ***


    // // *** Records Database API ***

    entryRecord = (uid) => this.db.ref(`/entryRecords/${uid}`);

    entryRecords = () => this.db.ref(`/entryRecords/`);

    usersRecord = (uid) => this.db.ref(`/usersRecords/${uid}`);

    usersRecords = () => this.db.ref(`/usersRecords/`);


    // // *** Stories Database API ***

    story  = (uid) => this.db.ref(`/stories/${uid}`);

    stories = () => this.db.ref(`/stories/`);


    // serviceStorage = (uidUser, uidService, path, imageName) => this.storage.ref(`/${uidUser}/services/${uidService}/${path}/${imageName}`);

    // servicesStorage = () => this.storage.ref('/services/');

    // *** Categories Storage API ***

    rootStorage = () => this.storage.ref(`/`);

    rootDB = () => this.db.ref(`/`);
    // *** Errors API ***

    error = uid => this.db.ref(`errors/${uid}`);


    registerLimit = () => this.db.ref(`/registerLimit`);


}

export default new FirebaseDBS();

// import database from '@react-native-firebase/database';
// import storage from '@react-native-firebase/storage';
// class FirebaseDBS {
//     constructor() {

//         this.db = database();
//         this.storage = storage();
//     }


//     user = uid => this.db.ref(`users/${uid}`);

//     users = () => this.db.ref('users');

//     // *** Establishment Storage API ***

//     usersDocumentStorage = (uidUser, path, imageName) => this.storage.ref(`/${uidUser}/${path}/${imageName}`);

//     // *** Chat API ***

//     chat = (chatUid) => this.db.ref(`chats/${chatUid}`);

//     chats = () => this.db.ref(`chats/`);

//     // *** UserChats API ***

//     userChats = (uidUser) => this.db.ref(`users/${uidUser}/chats/`);

//     // *** Establishments API ***chatUid

//     establishment = (uidUser, uidEstablishment) => this.db.ref(`users/${uidUser}/establishments/${uidEstablishment}`);

//     establishments = (uidUser) => this.db.ref(`users/${uidUser}/establishments/`);

//     // *** EstablishmentChats API ***    

//     establishmentsChats = (uidUser, uidEstablishment) => this.db.ref(`users/${uidUser}/establishments/${uidEstablishment}/chats/`);

//     // *** EstablishmentProducts API ***   

//     establishmentProduct = (uidUser, uidEstablishment, productUid) => this.db.ref(`users/${uidUser}/establishments/${uidEstablishment}/products/${productUid}/`);

//     establishmentProducts = (uidUser, uidEstablishment) => this.db.ref(`users/${uidUser}/establishments/${uidEstablishment}/products/`);

//     establishmentProductsCategories = (uidUser, uidEstablishment) => this.db.ref(`users/${uidUser}/establishments/${uidEstablishment}/productsCategories/`);

//     // *** Establishment Storage API ***

//     establishmentStorage = (uidUser, uidEstablishment, path, imageName) => this.storage.ref(`/${uidUser}/establishments/${uidEstablishment}/${path}/${imageName}`);

//     establishmentsStorage = (uidUser, uidEstablishment) => this.storage.ref(`/${uidUser}/establishments/${uidEstablishment}`);

//     establishmentProductsStorage = (uidUser, uidEstablishment) => this.storage.ref(`/${uidUser}/establishments/${uidEstablishment}/products/`);

//     // *** Services API ***

//     service = (uidUser, uidService) => this.db.ref(`users/${uidUser}/services/${uidService}`);

//     services = (uidUser) => this.db.ref(`users/${uidUser}/services/`);

//     // *** Services Storage API ***

//     serviceStorage = (uidUser, uidService, path, imageName) => this.storage.ref(`/${uidUser}/services/${uidService}/${path}/${imageName}`);

//     servicesStorage = (uidUser, uidService) => this.storage.ref(`/${uidUser}/services/${uidService}`);

//     // *** Donations API ***

//     donationEnroll = (uidUser, uidDonation) => this.db.ref(`users/${uidUser}/donations/enrolls/${uidDonation}`);

//     donationsEnroll = (uidUser) => this.db.ref(`users/${uidUser}/donations/enrolls`);

//     donationDonate = (uidUser, uidDonation) => this.db.ref(`users/${uidUser}/donations/donate/${uidDonation}`);

//     donationsDonate = (uidUser) => this.db.ref(`users/${uidUser}/donations/donate`);

//     // // *** Donations Storage API ***

//     // serviceStorage = (uidUser, uidService, path, imageName) => this.storage.ref(`/${uidUser}/services/${uidService}/${path}/${imageName}`);

//     // servicesStorage = () => this.storage.ref('/services/');

//     // *** Errors API ***

//     error = uid => this.db.ref(`errors/${uid}`);



// }

// export default new FirebaseDBS();