import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          // Navigation
          home: 'Home',
          about: 'About',
          services: 'Services',
          contact: 'Contact',

          // Common
          search: 'Search',
          results: 'Results',
          noResultsFound: 'No results found.',
          submit: 'Submit',
          cancel: 'Cancel',
          yes: 'Yes',
          no: 'No',
          error: 'Error',
          loading: 'Loading',
          active: 'Active',
          closed: 'Closed',
          all: 'All',
          delete: 'Delete',
          clear: 'Clear',

          // Pagination
          rowsPerPage: 'Rows per page',
          of: 'of',

          // Authentication
          login: 'Login',
          logout: 'Logout',
          register: 'Register',
          forgotPassword: 'Forgot Password',

          // UI Elements
          settings: 'Settings',
          language: 'Language',
          darkMode: 'Dark Mode',
          lightMode: 'Light Mode',
          privacyPolicy: 'Privacy Policy',
          termsAndConditions: 'Terms and Conditions',

          // Page Titles
          homePageTitle: 'Welcome to Our Website',
          aboutPageTitle: 'About Us',
          servicesPageTitle: 'Our Services',
          contactPageTitle: 'Contact Us',

          // Form Fields
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          emailOrUsername: 'Email Address or Username',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          message: 'Message',
          selectAll: 'Select All',
          unselectAll: 'Unselect All',

          // Files
          exportCSV: 'Export CSV file',
          exportExcel: 'Export Excel file',
          acceptedFormats: 'Accepted formats',
          dropFileHere: 'Drop the file here',
          dragNDropFileHere:
            'Drag and drop an Excel or CSV file here, or click to select one',
          wrongFileFormat: 'Wrong file format!',
          submitFile: 'Submit file',

          // Messages
          welcomeMessage: 'Welcome to our website!',
          thankYouMessage: 'Thank you for using our app!',
          successMessage: 'Success!',
          errorMessage: 'Oops! Something went wrong.',
          areYouSure: 'Are you sure?',

          entities: {
            // Roles
            roles: 'Roles',
            name: 'Name',
            displayName: 'Display Name',

            // Users
            users: 'Users',
            firstName: 'First Name',
            lastName: 'Last Name',
            username: 'Username',
            email: 'Email',
            password: 'Password',
            role: 'Role',
            createdBy: 'Created By',
            updatedBy: 'Updated By',

            // Business Numbers
            businessNumbers: 'Business Numbers',
            number: 'Number',

            // Cities
            cities: 'Cities',
            city: 'City',
            numberOfDebtors: 'Number of Debtors',
            numberOfExecutors: 'Number of Bailiffs',
            numberOfLawyers: 'Number of Lawyers',
            addNewCity: 'Add new City',
            editCity: 'Edit a City',
            deleteCity: 'Delete a City',

            // Clients
            client: 'Client',
            clients: 'Clients',
            addNewClient: 'Add new Client',
            editClient: 'Edit a Client',
            deleteClient: 'Delete a Client',

            // Courts
            court: 'Court',
            courts: 'Courts',
            addNewCourt: 'Add new Court',
            editCourt: 'Edit a Court',
            deleteCourt: 'Delete a Court',

            // Courts and Cities
            courtsAndCities: 'Courts and Cities',

            // Employers
            employers: 'Employers',
            employer: `Employer`,
            addNewEmployer: 'Add new Employer',
            editEmployer: 'Edit an Employer',
            deleteEmployer: 'Delete an Employer',

            // Clients and Employers
            clientsAndEmployers: 'Clients and Employers',

            // Excerpts
            excerpts: 'Excerpts',
            excerptNumber: 'Excerpt Number',

            // Files
            files: 'Files',
            filename: 'Filename',
            path: 'Path',
            mimeType: 'MIME Type',
            size: 'Size',

            // Packages
            package: 'Package',
            packages: 'Packages',
            packageName: 'Package Name',
            addNewPackage: 'Add new Package',
            editPackage: 'Edit a Package',
            deletePackage: 'Delete a Package',

            // SSN Numbers
            ssnNumbers: 'SSN Numbers',
            ssnNumber: 'SSN Number',
            ssn: 'SSN',
            addNewSSNNumber: 'Add new SSN Number',
            editSSNNumber: 'Edit a SSN Number',
            deleteSSNNumber: 'Delete a SSN Number',

            // SSN Numbers and Packages
            ssnNumbersAndPackages: 'SSN Numbers and Packages',

            // Lawyers
            lawyers: 'Lawyers',
            lawyer: 'Lawyer',
            officeName: 'Office Name',
            address: 'Address',
            addNewLawyer: 'Add new Lawyer',
            editLawyer: 'Edit a Lawyer',
            deleteLawyer: 'Delete a Lawyer',

            // Executors
            executors: 'Bailiffs',
            executor: 'Bailiff',
            addNewExecutor: 'Add new Bailiff',
            editExecutor: 'Edit a Bailiff',
            deleteExecutor: 'Delete a Bailiff',

            // People
            people: 'People',
            jmbg: 'JMBG',
            employed: 'Employed',

            // Organizations
            organizations: 'Organizations',
            pib: 'PIB',

            // Debtors
            debtors: 'Debtors',
            type: 'Type',
            isLegal: 'Is Legal',
            legalEntity: 'Legal Entity',
            cession: 'Cession',
            zipCode: 'ZIP Code',

            // Phone Numbers
            phoneNumbers: 'Phone Numbers',
            phoneNumber: 'Phone Number',
            displayNumber: 'Display Number',

            // Cases
            cases: 'Cases',
            caseNumber: 'Case Number',
            contractNumber: 'Contract Number',
            status: 'Status',
            closingDate: 'Closing Date',
            businessNumber: 'Business Number',
            principal: 'Principal',
            interest: 'Interest',
            jmbg_pib: 'JMBG / PIB',
            addNewCase: 'Add new Case',
            stateOfCases: 'State of Cases',
            editCase: 'Edit Case',
            deleteCase: 'Delete Case',
            exportCases: 'Export Cases',
            state: 'State of Cases',
            importCases: 'Import Cases',
            oldPayment: 'Paid before lawsuit',
            ourTaxes: 'Additional taxes',
            warningPrice: 'Cost of warning',
            enteringDate: 'Date of entering Creditexpress',
            lawyerHandOverDate: 'Lawyer hand-over date',
            comment: 'Comment',
            limitationObjection: 'Limitation of Objection',
            current_debt: 'Current debt',

            // Transactions
            transactions: 'Transactions',
            debtorsName: "Debtor's name",
            amount: 'Amount',
            postingMethod: 'Posting Method',
            paymentDate: 'Payment Date',
            payment: 'Payment',
            fee: 'Fee',
            legal_fee: 'Legal fee',
            withdrawal: 'Withdrawal',
            payments: 'Payments',
            fees: 'Fees',
            legal_fees: 'Legal fees',
            withdrawals: 'Withdrawals',
            addNewTransaction: 'Add new Transactions',
            transactionType: 'Transaction Type',
            editTransaction: 'Edit a Transaction',
            deleteTransaction: 'Delete a Transaction',
            totalAmount: 'Total amount',
            importTransactions: 'Import Transactions',

            // Case Executors
            caseExecutors: 'Case Bailiffs',

            // Case Business Numbers
            caseBusinessNumbers: 'Case Business Numbers',

            // Common
            numberOfCases: 'Number of Cases',
            numberOfEmployees: 'Number of employed Debtors',
          },

          messages: {
            retrieveCaseSuccess: 'Case retrieved successfully.',
            retrieveCitiesSuccess: 'City retrieved successfully.',
            retrieveClientsSuccess: 'Client retrieved successfully.',
            retrieveCourtsSuccess: 'Court retrieved successfully.',
            retrieveEmployersSuccess: 'Employer retrieved successfully.',
            retrieveExecutorSuccess: 'Bailiff retrieved successfully.',
            retrieveLawyerSuccess: 'Lawyer retrieved successfully.',
            retrievePackageSuccess: 'Package retrieved successfully.',
            retrieveSSNNumberSuccess: 'SSN Number retrieved successfully.',
            retrieveTransactionSuccess: 'Transaction retrieved successfully.',
            createCaseSuccess: 'Case created successfully.',
            editCaseSuccess: 'Case edited successfully.',
            caseDeleted: 'Case deleted successfully.',
            fileExportSuccess: 'File exported successfully.',
            fileImportSuccess: 'File imported and entries saved successfully.',
            createCitiesSuccess: 'City created successfully.',
            editCitiesSuccess: 'City edited successfully.',
            citiesDeleted: 'City deleted successfully.',
            createClientsSuccess: 'Client created successfully.',
            editClientsSuccess: 'Client edited successfully.',
            clientsDeleted: 'Client deleted successfully.',
            createCourtsSuccess: 'Court created successfully.',
            editCourtsSuccess: 'Court edited successfully.',
            courtsDeleted: 'Court deleted successfully.',
            createEmployersSuccess: 'Employer created successfully.',
            editEmployersSuccess: 'Employer edited successfully.',
            employersDeleted: 'Employer deleted successfully.',
            createExecutorSuccess: 'Bailiff created successfully.',
            editExecutorSuccess: 'Bailiff edited successfully.',
            executorDeleted: 'Bailiff deleted successfully.',
            createLawyerSuccess: 'Lawyer created successfully.',
            editLawyerSuccess: 'Lawyer edited successfully.',
            lawyerDeleted: 'Lawyer deleted successfully.',
            createPackageSuccess: 'Package created successfully.',
            editPackageSuccess: 'Package edited successfully.',
            packageDeleted: 'Package deleted successfully.',
            createSSNSuccess: 'SSN Number created successfully.',
            editSSNSuccess: 'SSN Number edited successfully.',
            ssnDeleted: 'SSN Number deleted successfully.',
            createTransactionSuccess: 'Transaction created successfully.',
            editTransactionSuccess: 'Transaction edited successfully.',
            transactionDeleted: 'Transaction deleted successfully.',
          },

          errors: {
            // Common errors
            nothingChanged: 'You have not changed anything.',
            noName: 'You have not entered a name.',
            noJMBG: 'You have not entered a JMBG.',
            noSSN: 'You have not entered a SSN Number.',
            noType: 'You have not choosen a Transaction type.',
            noAmount: 'You have not entered an amount.',
            caseNotFound: 'The case was not found.',
            closingDateLate: 'Closing date has not happened yet.',
            noContractNumber: 'You have not entered a contract number.',
            noCaseNumber: 'You have not entered a case number.',
            noClient: 'You have not selected a client.',
            noPaymentDate: 'You have not selected a payment date.',
            caseOrContractNumberDuplicate:
              'Case with the same case or contract number already exists.',
            phoneNumberNull:
              'Phone numbers, bailiffs, or business numbers cannot be null.',
            personNotFound: 'This person is not found.',
            organizationNotFound: 'This organization is not found.',
            noValidExportFieldsChecked:
              'There is a problem with checklist you have choosen.',
            invalidFileType: 'Invalid file type.',
            noFile: 'You have not selected file.',
            noCession: 'Cession is required field.',
            noIsLegal: 'Is Legal is required field.',
            requiredField: 'This field is required.',
            invalidEmail: 'Invalid email address.',
            emailTaken: 'This email is already taken.',
            usernameTaken: 'This username is already taken.',
            invalidPassword: 'Password must be at least 6 characters long.',
            invalidNumber: 'Invalid number.',
            invalidSSN: 'Invalid SSN.',
            invalidDate: 'Invalid date format.',
            invalidFile: 'Invalid file format.',
            fileSizeExceeded: 'File size exceeded the allowed limit.',
            unauthorized: 'Unauthorized access.',
            notFound: 'Requested resource not found.',
            serverError: 'Server error occurred.',
            invalidAccessToken:
              'Your session expired. Refresh to log in again.',
            noAccessToken: 'Invalid login. Refresh to log in again.',
            accessTokenNotConfigured:
              'Unsuccessful login. Failed to configure access token. Contact technical person.',
            // Add more common error messages here
          },
        },
      },
      'sr-RS': {
        translation: {
          // Navigation
          home: 'Početna',
          about: 'O nama',
          services: 'Usluge',
          contact: 'Kontakt',

          // Common
          search: 'Pretraga',
          results: 'Rezultati',
          noResultsFound: 'Nema pronađenih rezultata.',
          submit: 'Potvrdi',
          cancel: 'Otkaži',
          yes: 'Da',
          no: 'Ne',
          error: 'Greška',
          loading: 'Učitavanje',
          active: 'Aktivni',
          closed: 'Zatvoreni',
          all: 'Svi',
          delete: 'Obriši',
          clear: 'Očisti',

          // Pagination
          rowsPerPage: 'Broj redova po strani',
          of: 'od',

          // Authentication
          login: 'Prijava',
          logout: 'Odjava',
          register: 'Registracija',
          forgotPassword: 'Zaboravljena lozinka',

          // UI Elements
          settings: 'Podešavanja',
          language: 'Jezik',
          darkMode: 'Tamna tema',
          lightMode: 'Svetla tema',
          privacyPolicy: 'Politika privatnosti',
          termsAndConditions: 'Uslovi korišćenja',

          // Page Titles
          homePageTitle: 'Dobrodošli na naš sajt',
          aboutPageTitle: 'O nama',
          servicesPageTitle: 'Naše usluge',
          contactPageTitle: 'Kontaktirajte nas',

          // Form Fields
          firstName: 'Ime',
          lastName: 'Prezime',
          email: 'Email',
          emailOrUsername: 'Email adresa ili korisničko ime',
          password: 'Lozinka',
          confirmPassword: 'Potvrdite lozinku',
          message: 'Poruka',
          selectAll: 'Čekiraj sve',
          unselectAll: 'Odčekiraj sve',

          // Files
          exportCSV: 'Izvezi CSV datoteku',
          exportExcel: 'Izvezi Excel datoteku',
          acceptedFormats: 'Prihvatljivi formati',
          dropFileHere: 'Ispustite datoteku ovde',
          dragNDropFileHere:
            'Prevucite i ispustite Excel ili CSV datoteku ovde, ili selektujte polje kako bi je dodali',
          wrongFileFormat: 'Pogrešan format datoteke!',
          submitFile: 'Prosledi datoteku',

          // Messages
          welcomeMessage: 'Dobrodošli na naš sajt!',
          thankYouMessage: 'Hvala vam što koristite našu aplikaciju!',
          successMessage: 'Uspešno!',
          errorMessage: 'Ups! Nešto je pošlo po zlu.',
          areYouSure: 'Da li ste sigurni?',

          entities: {
            // Roles
            roles: 'Uloge',
            name: 'Ime',
            displayName: 'Prikazano ime',

            // Users
            users: 'Korisnici',
            firstName: 'Ime',
            lastName: 'Prezime',
            username: 'Korisničko ime',
            email: 'Email',
            password: 'Lozinka',
            role: 'Uloga',
            createdBy: 'Kreirao',
            updatedBy: 'Ažurirao',

            // Business Numbers
            businessNumbers: 'Poslovni brojevi',
            number: 'Broj',

            // Cities
            cities: 'Gradovi',
            city: 'Grad',
            numberOfDebtors: 'Broj dužnika',
            numberOfExecutors: 'Broj izvršitelja',
            numberOfLawyers: 'Broj advokata',
            addNewCity: 'Dodaj novi grad',
            editCity: 'Izmeni grad',
            deleteCity: 'Izbriši grad',

            // Clients
            client: 'Klijent',
            clients: 'Klijenti',
            addNewClient: 'Dodaj novog klijenta',
            editClient: 'Izmeni klijenta',
            deleteClient: 'Izbriši klijenta',

            // Courts
            court: 'Sud',
            courts: 'Sudovi',
            addNewCourt: 'Dodaj novi sud',
            editCourt: 'Izmeni sud',
            deleteCourt: 'Izbriši sud',

            // Courts and Cities
            courtsAndCities: 'Sudovi i Gradovi',

            // Employers
            employers: 'Poslodavci',
            employer: 'Poslodavac',
            addNewEmployer: 'Dodaj novog poslodavca',
            editEmployer: 'Izmeni poslodavca',
            deleteEmployer: 'Izbriši poslodavca',

            // Clients and Employers
            clientsAndEmployers: 'Klijenti i Poslodavci',

            // Excerpts
            excerpts: 'Izvodi',
            excerptNumber: 'Broj izvoda',

            // Files
            files: 'Fajlovi',
            filename: 'Naziv fajla',
            path: 'Putanja',
            mimeType: 'MIME tip',
            size: 'Veličina',

            // Packages
            package: 'Paket',
            packages: 'Paketi',
            packageName: 'Naziv paketa',
            addNewPackage: 'Dodaj novi Paket',
            editPackage: 'Izmeni paket',
            deletePackage: 'Izbriši paket',

            // SSN Numbers
            ssnNumbers: 'SSN brojevi',
            ssnNumber: 'SSN broj',
            ssn: 'SSN',
            addNewSSNNumber: 'Dodaj novi SSN broj',
            editSSNNumber: 'Izmeni SSN broj',
            deleteSSNNumber: 'Izbriši SSN broj',

            // SSN Numbers and Packages
            ssnNumbersAndPackages: 'SSN brojevi i Paketi',

            // Lawyers
            lawyers: 'Advokati',
            lawyer: 'Advokat',
            officeName: 'Naziv kancelarije',
            address: 'Adresa',
            addNewLawyer: 'Dodaj novog advokata',
            editLawyer: 'Izmeni advokata',
            deleteLawyer: 'Izbriši advokata',

            // Executors
            executors: 'Izvršitelji',
            executor: 'Izvršitelj',
            addNewExecutor: 'Dodaj novog izvršitelja',
            editExecutor: 'Izmeni izvršitelja',
            deleteExecutor: 'Izbriši izvršitelja',

            // People
            people: 'Ljudi',
            jmbg: 'JMBG',
            employed: 'Zaposlen',

            // Organizations
            organizations: 'Organizacije',
            pib: 'PIB',

            // Debtors
            debtors: 'Dužnici',
            type: 'Tip',
            isLegal: 'Pravno lice',
            legalEntity: 'Pravno lice',
            cession: 'Cesija',
            zipCode: 'Poštanski broj',

            // Phone Numbers
            phoneNumbers: 'Brojevi telefona',
            phoneNumber: 'Broj telefona',
            displayNumber: 'Prikazani broj',

            // Cases
            cases: 'Predmeti',
            caseNumber: 'Broj predmeta',
            contractNumber: 'Broj ugovora',
            status: 'Status',
            closingDate: 'Datum zatvaranja',
            businessNumber: 'Poslovni broj',
            principal: 'Glavni iznos',
            interest: 'Kamata',
            jmbg_pib: 'JMBG / PIB',
            addNewCase: 'Dodaj novi predmet',
            stateOfCases: 'Stanje predmeta',
            editCase: 'Izmeni predmet',
            deleteCase: 'Izbriši predmet',
            exportCases: 'Izvezi predmete',
            state: 'Stanje predmeta',
            importCases: 'Uvezi predmete',
            oldPayment: 'Otplaćeno pre utuženja',
            ourTaxes: 'Dodatne takse',
            warningPrice: 'Trošak opomene',
            enteringDate: 'Datum ulaska u Creditexpress',
            lawyerHandOverDate: 'Datum predaje advokatima',
            comment: 'Komentar',
            limitationObjection: 'Prigovor zastarelosti',
            current_debt: 'Trenutno dugovanje',

            // Transactions
            transactions: 'Transakcije',
            debtorsName: 'Ime dužnika',
            amount: 'Iznos',
            postingMethod: 'Način evidentiranja',
            paymentDate: 'Datum uplate',
            payment: 'Uplata',
            fee: 'Taksa',
            legal_fee: 'Sudska taksa',
            withdrawal: 'Povlačenje predmeta',
            payments: 'Uplate',
            fees: 'Takse',
            legal_fees: 'Sudske takse',
            withdrawals: 'Povlačenja predmeta',
            addNewTransaction: 'Dodaj novu transakciju',
            transactionType: 'Tip transakcije',
            editTransaction: 'Izmeni transakciju',
            deleteTransaction: 'Izbriši transakciju',
            totalAmount: 'Ukupna suma',
            importTransactions: 'Uvezi transakcije',

            // Case Executors
            caseExecutors: 'Izvršitelji predmeta',

            // Case Business Numbers
            caseBusinessNumbers: 'Poslovni brojevi predmeta',

            // Common
            numberOfCases: 'Broj predmeta',
            numberOfEmployees: 'Broj zaposlenih dužnika',
          },

          messages: {
            retrieveCaseSuccess: 'Predmet uspešno pronađen.',
            retrieveCitiesSuccess: 'Grad uspešno pronađen.',
            retrieveClientsSuccess: 'Klijent uspešno pronađen.',
            retrieveCourtsSuccess: 'Sud uspešno pronađen.',
            retrieveEmployersSuccess: 'Poslodavac uspešno pronađen.',
            retrieveExecutorSuccess: 'Izvršitelj uspešno pronađen.',
            retrieveLawyerSuccess: 'Advokat uspešno pronađen.',
            retrievePackageSuccess: 'Paket uspešno pronađen.',
            retrieveSSNNumberSuccess: 'SSN broj uspešno pronađen.',
            retrieveTransactionSuccess: 'Transakcija uspešno pronađen.',
            createCaseSuccess: 'Predmet uspešno dodat.',
            editCaseSuccess: 'Predmet uspešno izmenjen.',
            caseDeleted: 'Predmet uspešno izbrisan.',
            fileExportSuccess: 'Datoteka uspešno izvezena.',
            fileImportSuccess: 'Datoteka uspešno uvezena i unosi sačuvani.',
            createCitiesSuccess: 'Grad uspešno dodat.',
            editCitiesSuccess: 'Grad uspešno izmenjen.',
            citiesDeleted: 'Grad uspešno izbrisan.',
            createClientsSuccess: 'Klijent uspešno dodat.',
            editClientsSuccess: 'Klijent uspešno izmenjen.',
            clientsDeleted: 'Klijent uspešno izbrisan.',
            createCourtsSuccess: 'Sud uspešno dodat.',
            editCourtsSuccess: 'Sud uspešno izmenjen.',
            courtsDeleted: 'Sud uspešno izbrisan.',
            createEmployersSuccess: 'Poslodavac uspešno dodat.',
            editEmployersSuccess: 'Poslodavac uspešno izmenjen.',
            employersDeleted: 'Poslodavac uspešno izbrisan.',
            createExecutorSuccess: 'Izvršilac uspešno dodat.',
            editExecutorSuccess: 'Izvršilac uspešno izmenjen.',
            executorDeleted: 'Izvršilac uspešno izbrisan.',
            createLawyerSuccess: 'Advokat uspešno dodat.',
            editLawyerSuccess: 'Advokat uspešno izmenjen.',
            lawyerDeleted: 'Advokat uspešno izbrisan.',
            createPackageSuccess: 'Paket uspešno dodat.',
            editPackageSuccess: 'Paket uspešno izmenjen.',
            packageDeleted: 'Paket uspešno izbrisan.',
            createSSNSuccess: 'SSN broj uspešno dodat.',
            editSSNSuccess: 'SSN broj uspešno izmenjen.',
            ssnDeleted: 'SSN broj uspešno izbrisan.',
            createTransactionSuccess: 'Transakcija uspešno dodata.',
            editTransactionSuccess: 'Transakcija uspešno izmenjena.',
            transactionDeleted: 'Transakcija uspešno izbrisana.',
          },

          errors: {
            // Common errors
            nothingChanged: 'Niste izmenili nijedan podatak.',
            noName: 'Niste uneli ime.',
            noJMBG: 'Niste uneli JMBG.',
            noSSN: 'Niste uneli SSN broj.',
            noType: 'Niste izabrali tip transakcije.',
            noAmount: 'Niste uneli iznos.',
            caseNotFound: 'Predmet nije pronađen.',
            closingDateLate: 'Datum zatvaranja se još nije dogodio.',
            noContractNumber: 'Niste uneli broj ugovora.',
            noCaseNumber: 'Niste uneli broj predmeta.',
            noClient: 'Niste odabrali klijenta.',
            noPaymentDate: 'Niste odabrali datum uplate.',
            caseOrContractNumberDuplicate:
              'Predmet sa istim brojem predmeta ili brojem ugovora već postoji.',
            phoneNumberNull:
              'Brojevi telefona, pravni izvršitelji ili poslovni brojevi ne mogu biti null vrednost.',
            personNotFound: 'Ova osoba nije pronađena.',
            organizationNotFound: 'Ova organizacija nije pronađena.',
            noValidExportFieldsChecked:
              'Došlo je do problema pri čekiranju polja.',
            invalidFileType: 'Nevalidan tip datoteke.',
            noFile: 'Niste selektovali nijednu datoteku.',
            noCession: 'Cesija je obavezno polje.',
            noIsLegal: 'Pravno lice je obavezno polje.',
            requiredField: 'Ovo polje je obavezno.',
            invalidEmail: 'Neispravna email adresa.',
            emailTaken: 'Ovaj email je već zauzet.',
            usernameTaken: 'Ovo korisničko ime je već zauzeto.',
            invalidPassword: 'Lozinka mora sadržati najmanje 6 karaktera.',
            invalidNumber: 'Neispravan broj.',
            invalidSSN: 'Neispravan JMBG.',
            invalidDate: 'Neispravan format datuma.',
            invalidFile: 'Neispravan format fajla.',
            fileSizeExceeded:
              'Veličina fajla premašuje dozvoljeno ograničenje.',
            unauthorized: 'Nemate ovlašćenje za pristup.',
            notFound: 'Traženi resurs nije pronađen.',
            serverError: 'Došlo je do greške na serveru.',
            invalidAccessToken:
              'Tvoja sesija je istekla. Osveži stranicu i prijavi se opet.',
            noAccessToken:
              'Nevalidna prijava. Osveži stranicu i prijavi se opet.',
            accessTokenNotConfigured:
              'Neuspešna prijava. Token za prijavu nepravilno konfigurisan. Kontaktirajte tehničko lice.',
            // Add more common error messages here
          },
        },
      },
    },
  });

export default i18n;
