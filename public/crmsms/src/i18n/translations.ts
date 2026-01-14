export type Language = "he" | "en";

export interface Translations {
    common: {
        save: string;
        cancel: string;
        delete: string;
        edit: string;
        close: string;
        confirm: string;
        yes: string;
        no: string;
        loading: string;
        error: string;
        success: string;
        search: string;
        filter: string;
        viewAll: string;
        add: string;
        update: string;
        back: string;
        next: string;
        submit: string;
    };
    nav: {
        home: string;
        newCampaign: string;
        allCampaigns: string;
        about: string;
        profile: string;
        logout: string;
    };
    auth: {
        login: string;
        register: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        signIn: string;
        signInToManage: string;
        createAccount: string;
        registerToStart: string;
        dontHaveAccount: string;
        registerHere: string;
        alreadyHaveAccount: string;
        loginHere: string;
        wrongInfo: string;
        loggedIn: string;
        registeredSuccessfully: string;
    };
    campaigns: {
        allCampaigns: string;
        manageCampaigns: string;
        newCampaign: string;
        createNewCampaign: string;
        createCampaign: string;
        campaignName: string;
        ownerName: string;
        ownerPhone: string;
        noCampaigns: string;
        noCampaignsYet: string;
        getStarted: string;
        deleteCampaign: string;
        deleteEvent: string;
        deleteEventConfirm: string;
    };
    wedding: {
        groom: string;
        bride: string;
        groomParents: string;
        brideParents: string;
        weddingDate: string;
        weddingSentence: string;
        eventsHall: string;
        coupleInformation: string;
        parentsInformation: string;
        chooseWeddingSentence: string;
        noSentencesAvailable: string;
    };
    guests: {
        guests: string;
        guestsForEvent: string;
        viewAddManage: string;
        addNewGuest: string;
        fillGuestDetails: string;
        phoneNumber: string;
        firstName: string;
        lastName: string;
        group: string;
        addGroup: string;
        numberOfGuests: string;
        numberOfGuestsAccept: string;
        acceptedGuests: string;
        addPeople: string;
        manageGuestList: string;
        noGuestsYet: string;
        saveTheDate: string;
        onlineInvitation: string;
        importFromExcel: string;
        sendSMS: string;
        updateGuest: string;
        deleteGuest: string;
        deleteGuestConfirm: string;
        guestDeleted: string;
        peopleAdded: string;
        peopleDataChanged: string;
        seeYouSoon: string;
    };
    modals: {
        addGuest: string;
        addGroup: string;
        addGroupInterface: string;
        updateGuest: string;
        deleteItem: string;
        deleteGuestQuestion: string;
        deleteEventQuestion: string;
        areYouSure: string;
        cannotBeUndone: string;
        deleteEventConfirm: string;
        groupAdded: string;
    };
    dashboard: {
        timerForLove: string;
        couplePhoto: string;
        confirmedArrival: string;
        guestsConfirmed: string;
        noDateSet: string;
        addImage: string;
        justMarried: string;
        days: string;
    };
    profile: {
        freeAccount: string;
        canMakeEdit: string;
        canSendFree: string;
        makeMoreEvents: string;
    };
    about: {
        title: string;
        createdBy: string;
        teamBehind: string;
        contact: string;
        haveQuestion: string;
        reachOut: string;
        thankYou: string;
    };
    footer: {
        createdWith: string;
        by: string;
        copyright: string;
    };
    invitation: {
        saveTheDate: string;
        inviteYou: string;
        reception: string;
        chuppah: string;
        celebration: string;
        happyToSee: string;
        brideParents: string;
        groomParents: string;
        time: string;
        date: string;
        location: string;
    };
    client: {
        hi: string;
        confirmHowMany: string;
        areYouComing: string;
        people: string;
        update: string;
        thisIsOnlyForMobile: string;
    };
    upload: {
        addNewImage: string;
        coupleImage: string;
        uploadImage: string;
        uploading: string;
        imageSave: string;
    };
    excel: {
        importExcel: string;
    };
    errors: {
        somethingWentWrong: string;
        noDataToShow: string;
        errorCantGetInfo: string;
    };
}

export const translations: Record<Language, Translations> = {
    en: {
        common: {
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            edit: "Edit",
            close: "Close",
            confirm: "Confirm",
            yes: "Yes",
            no: "No",
            loading: "Loading...",
            error: "Error",
            success: "Success",
            search: "Search",
            filter: "Filter",
            viewAll: "View all",
            add: "Add",
            update: "Update",
            back: "Back",
            next: "Next",
            submit: "Submit",
        },
        nav: {
            home: "Home",
            newCampaign: "New Campaign",
            allCampaigns: "All Campaigns",
            about: "About",
            profile: "Profile",
            logout: "Logout",
        },
        auth: {
            login: "Login",
            register: "Register",
            email: "Email address",
            password: "Password",
            firstName: "First Name",
            lastName: "Last Name",
            signIn: "Sign in",
            signInToManage: "Sign in to manage your SMS campaigns.",
            createAccount: "Create account",
            registerToStart: "Register to start sending and managing SMS invitations.",
            dontHaveAccount: "Don't have an account?",
            registerHere: "Register here",
            alreadyHaveAccount: "Already have an account?",
            loginHere: "Login here",
            wrongInfo: "Wrong info",
            loggedIn: "You Loged-In :)",
            registeredSuccessfully: "You registered successfully!",
        },
        campaigns: {
            allCampaigns: "All Campaigns",
            manageCampaigns: "Manage all your SMS campaigns in one place",
            newCampaign: "New Campaign",
            createNewCampaign: "Create New Campaign",
            createCampaign: "Create Campaign",
            campaignName: "Campaign Name",
            ownerName: "Owner Name",
            ownerPhone: "Owner Phone",
            noCampaigns: "No campaigns yet.",
            noCampaignsYet: "No campaigns yet",
            getStarted: "Get started by creating your first campaign",
            deleteCampaign: "Delete Campaign",
            deleteEvent: "Delete Event",
            deleteEventConfirm: "Are you sure you want to delete this event? This action cannot be undone.",
        },
        wedding: {
            groom: "Groom (חתן)",
            bride: "Bride (כלה)",
            groomParents: "Groom Parents",
            brideParents: "Bride Parents",
            weddingDate: "Wedding Date",
            weddingSentence: "Wedding Sentence",
            eventsHall: "Events Hall",
            coupleInformation: "Couple Information",
            parentsInformation: "Parents Information",
            chooseWeddingSentence: "Choose a Wedding Sentence...",
            noSentencesAvailable: "No sentences available",
        },
        guests: {
            guests: "guests",
            guestsForEvent: "Guests for event",
            viewAddManage: "View, add and manage all guests for this campaign.",
            addNewGuest: "Add New Guest",
            fillGuestDetails: "Fill in the guest details below",
            phoneNumber: "Phone Number",
            firstName: "First Name",
            lastName: "Last Name",
            group: "Group",
            addGroup: "Add group",
            numberOfGuests: "Number Of Guests",
            numberOfGuestsAccept: "Number Of Guests Accept",
            acceptedGuests: "Guests confirmed",
            addPeople: "Add people",
            manageGuestList: "Manage your guest list and invitations for this event.",
            noGuestsYet: "No guests yet.",
            saveTheDate: "Save The Date",
            onlineInvitation: "Online Invitation",
            importFromExcel: "Import from Excel",
            sendSMS: "Send SMS",
            updateGuest: "Update Guest",
            deleteGuest: "Delete Guest?",
            deleteGuestConfirm: "Are you sure you want to delete this guest? This action cannot be undone.",
            guestDeleted: "Guest Deleted",
            peopleAdded: "People Added",
            peopleDataChanged: "People data change and save",
            seeYouSoon: "See You Soon! All data save... and you SAVE THE DATE :)",
        },
        modals: {
            addGuest: "Add Guest",
            addGroup: "Add Group",
            addGroupInterface: "Add Group interface",
            updateGuest: "Update Guest",
            deleteItem: "Delete Item?",
            deleteGuestQuestion: "Delete Guest?",
            deleteEventQuestion: "Delete Event?",
            areYouSure: "Are You Sure?",
            cannotBeUndone: "This action cannot be undone.",
            deleteEventConfirm: "Are you sure you want to delete this event? This action cannot be undone.",
            groupAdded: "Group Added",
        },
        dashboard: {
            timerForLove: "Timer for Love",
            couplePhoto: "Couple Photo",
            confirmedArrival: "Confirmed Arrival",
            guestsConfirmed: "Guests confirmed",
            noDateSet: "No date set",
            addImage: "Add Image",
            justMarried: "Just Married",
            days: "💜 Days 💜",
        },
        profile: {
            freeAccount: "Free Account",
            canMakeEdit: "Can make and edit all Event",
            canSendFree: "Can Send free sms from web",
            makeMoreEvents: "Make More Events",
        },
        about: {
            title: "CRM SMS Invitation",
            createdBy: "Created by Lidor Maliach",
            teamBehind: "The team behind the product",
            contact: "Contact",
            haveQuestion: "Have a question or feedback? Reach out any time:",
            reachOut: "Reach out any time:",
            thankYou: "Thank you for choosing CRM SMS Invitation to power your events. We hope this system helps you create a smooth and joyful experience for you and your guests.",
        },
        footer: {
            createdWith: "Created with",
            by: "by",
            copyright: "© 2023 Copyright",
        },
        invitation: {
            saveTheDate: "Save The Date",
            inviteYou: "מזמינים אתכם לחתונתם",
            reception: "קבלת פנים",
            chuppah: "חופה וקידושין",
            celebration: "עושים שמח",
            happyToSee: "נשמח לראותכם בין אורחינו",
            brideParents: "הורי הכלה",
            groomParents: "הורי החתן",
            time: "Time",
            date: "Date",
            location: "Location",
        },
        client: {
            hi: "Hi",
            confirmHowMany: "Please confirm how many people are coming to the event, thank you very much",
            areYouComing: "Are you going to come with",
            people: "People",
            update: "Update",
            thisIsOnlyForMobile: "This is only for mobile",
        },
        upload: {
            addNewImage: "Add New Image For Couple",
            coupleImage: "Couple Image",
            uploadImage: "Upload Image",
            uploading: "Uploading...",
            imageSave: "Image Save",
        },
        excel: {
            importExcel: "Import from Excel",
        },
        errors: {
            somethingWentWrong: "Sorry! Something went wrong...",
            noDataToShow: "No Data To Show",
            errorCantGetInfo: "Error , Can't get info...",
        },
    },
    he: {
        common: {
            save: "שמור",
            cancel: "ביטול",
            delete: "מחק",
            edit: "ערוך",
            close: "סגור",
            confirm: "אישור",
            yes: "כן",
            no: "לא",
            loading: "טוען...",
            error: "שגיאה",
            success: "הצלחה",
            search: "חיפוש",
            filter: "סינון",
            viewAll: "הצג הכל",
            add: "הוסף",
            update: "עדכן",
            back: "חזור",
            next: "הבא",
            submit: "שלח",
        },
        nav: {
            home: "בית",
            newCampaign: "קמפיין חדש",
            allCampaigns: "כל הקמפיינים",
            about: "אודות",
            profile: "פרופיל",
            logout: "התנתק",
        },
        auth: {
            login: "התחברות",
            register: "הרשמה",
            email: "כתובת אימייל",
            password: "סיסמה",
            firstName: "שם פרטי",
            lastName: "שם משפחה",
            signIn: "התחבר",
            signInToManage: "התחבר כדי לנהל את קמפייני ה-SMS שלך.",
            createAccount: "צור חשבון",
            registerToStart: "הירשם כדי להתחיל לשלוח ולנהל הזמנות SMS.",
            dontHaveAccount: "אין לך חשבון?",
            registerHere: "הירשם כאן",
            alreadyHaveAccount: "כבר יש לך חשבון?",
            loginHere: "התחבר כאן",
            wrongInfo: "פרטים שגויים",
            loggedIn: "התחברת בהצלחה :)",
            registeredSuccessfully: "נרשמת בהצלחה!",
        },
        campaigns: {
            allCampaigns: "כל הקמפיינים",
            manageCampaigns: "נהל את כל קמפייני ה-SMS שלך במקום אחד",
            newCampaign: "קמפיין חדש",
            createNewCampaign: "צור קמפיין חדש",
            createCampaign: "צור קמפיין",
            campaignName: "שם הקמפיין",
            ownerName: "שם הבעלים",
            ownerPhone: "טלפון הבעלים",
            noCampaigns: "אין עדיין קמפיינים.",
            noCampaignsYet: "אין עדיין קמפיינים",
            getStarted: "התחל על ידי יצירת הקמפיין הראשון שלך",
            deleteCampaign: "מחק קמפיין",
            deleteEvent: "מחק אירוע",
            deleteEventConfirm: "האם אתה בטוח שברצונך למחוק את האירוע הזה? פעולה זו לא ניתנת לביטול.",
        },
        wedding: {
            groom: "חתן",
            bride: "כלה",
            groomParents: "הורי החתן",
            brideParents: "הורי הכלה",
            weddingDate: "תאריך החתונה",
            weddingSentence: "משפט החתונה",
            eventsHall: "אולם האירועים",
            coupleInformation: "פרטי הזוג",
            parentsInformation: "פרטי ההורים",
            chooseWeddingSentence: "בחר משפט חתונה...",
            noSentencesAvailable: "אין משפטים זמינים",
        },
        guests: {
            guests: "מוזמנים",
            guestsForEvent: "מוזמנים לאירוע",
            viewAddManage: "צפה, הוסף ונהל את כל המוזמנים לקמפיין הזה.",
            addNewGuest: "הוסף מוזמן חדש",
            fillGuestDetails: "מלא את פרטי המוזמן למטה",
            phoneNumber: "מספר טלפון",
            firstName: "שם פרטי",
            lastName: "שם משפחה",
            group: "קבוצה",
            addGroup: "הוסף קבוצה",
            numberOfGuests: "מספר מוזמנים",
            numberOfGuestsAccept: "מספר מוזמנים מאשרים",
            acceptedGuests: "מוזמנים מאשרים",
            addPeople: "הוסף אנשים",
            manageGuestList: "נהל את רשימת המוזמנים וההזמנות לאירוע הזה.",
            noGuestsYet: "אין עדיין מוזמנים.",
            saveTheDate: "שמור את התאריך",
            onlineInvitation: "הזמנה מקוונת",
            importFromExcel: "ייבא מ-Excel",
            sendSMS: "שלח SMS",
            updateGuest: "עדכן מוזמן",
            deleteGuest: "מחק מוזמן?",
            deleteGuestConfirm: "האם אתה בטוח שברצונך למחוק את המוזמן הזה? פעולה זו לא ניתנת לביטול.",
            guestDeleted: "מוזמן נמחק",
            peopleAdded: "אנשים נוספו",
            peopleDataChanged: "נתוני אנשים שונו ונשמרו",
            seeYouSoon: "נתראה בקרוב! כל הנתונים נשמרו... ואתה שמרת את התאריך :)",
        },
        modals: {
            addGuest: "הוסף מוזמן",
            addGroup: "הוסף קבוצה",
            addGroupInterface: "ממשק הוספת קבוצה",
            updateGuest: "עדכן מוזמן",
            deleteItem: "מחק פריט?",
            deleteGuestQuestion: "מחק מוזמן?",
            deleteEventQuestion: "מחק אירוע?",
            areYouSure: "האם אתה בטוח?",
            cannotBeUndone: "פעולה זו לא ניתנת לביטול.",
            deleteEventConfirm: "האם אתה בטוח שברצונך למחוק את האירוע הזה? פעולה זו לא ניתנת לביטול.",
            groupAdded: "קבוצה נוספה",
        },
        dashboard: {
            timerForLove: "טיימר לאהבה",
            couplePhoto: "תמונת הזוג",
            confirmedArrival: "אישור הגעה",
            guestsConfirmed: "מוזמנים מאשרים",
            noDateSet: "לא הוגדר תאריך",
            addImage: "הוסף תמונה",
            justMarried: "נישאו זה עתה",
            days: "💜 ימים 💜",
        },
        profile: {
            freeAccount: "חשבון חינם",
            canMakeEdit: "יכול ליצור ולערוך כל אירוע",
            canSendFree: "יכול לשלוח SMS חינם מהאינטרנט",
            makeMoreEvents: "צור עוד אירועים",
        },
        about: {
            title: "CRM SMS הזמנות",
            createdBy: "נוצר על ידי לידור מלך",
            teamBehind: "הצוות מאחורי המוצר",
            contact: "יצירת קשר",
            haveQuestion: "יש לך שאלה או משוב? צור קשר בכל עת:",
            reachOut: "צור קשר בכל עת:",
            thankYou: "תודה שבחרת ב-CRM SMS Invitation להפעלת האירועים שלך. אנו מקווים שהמערכת הזו תעזור לך ליצור חוויה חלקה ושמחה עבורך ועבור המוזמנים שלך.",
        },
        footer: {
            createdWith: "נוצר עם",
            by: "על ידי",
            copyright: "© 2023 זכויות יוצרים",
        },
        invitation: {
            saveTheDate: "שמור את התאריך",
            inviteYou: "מזמינים אתכם לחתונתם",
            reception: "קבלת פנים",
            chuppah: "חופה וקידושין",
            celebration: "עושים שמח",
            happyToSee: "נשמח לראותכם בין אורחינו",
            brideParents: "הורי הכלה",
            groomParents: "הורי החתן",
            time: "שעה",
            date: "תאריך",
            location: "מיקום",
        },
        client: {
            hi: "שלום",
            confirmHowMany: "אנא אשר כמה אנשים מגיעים לאירוע, תודה רבה",
            areYouComing: "האם אתה מגיע עם",
            people: "אנשים",
            update: "עדכן",
            thisIsOnlyForMobile: "זה מיועד רק למובייל",
        },
        upload: {
            addNewImage: "הוסף תמונה חדשה לזוג",
            coupleImage: "תמונת הזוג",
            uploadImage: "העלה תמונה",
            uploading: "מעלה...",
            imageSave: "תמונה נשמרה",
        },
        excel: {
            importExcel: "ייבא מ-Excel",
        },
        errors: {
            somethingWentWrong: "מצטער! משהו השתבש...",
            noDataToShow: "אין נתונים להצגה",
            errorCantGetInfo: "שגיאה, לא ניתן לקבל מידע...",
        },
    },
};

