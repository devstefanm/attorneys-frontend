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

          // Messages
          welcomeMessage: 'Welcome to our website!',
          thankYouMessage: 'Thank you for using our app!',
          successMessage: 'Success!',
          errorMessage: 'Oops! Something went wrong.',

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
            numberOfExecutors: 'Number of Executors',
            numberOfLawyers: 'Number of Lawyers',

            // Clients
            client: 'Client',
            clients: 'Clients',

            // Courts
            court: 'Court',
            courts: 'Courts',

            // Courts and Cities
            courtsAndCities: 'Courts and Cities',

            // Employers
            employers: 'Employers',
            employer: `Employer`,

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

            // SSN Numbers
            ssnNumbers: 'SSN Numbers',
            ssn: 'SSN',

            // SSN Numbers and Packages
            ssnNumbersAndPackages: 'SSN Numbers and Packages',

            // Lawyers
            lawyers: 'Lawyers',
            lawyer: 'Lawyer',
            officeName: 'Office Name',
            address: 'Address',

            // Executors
            executors: 'Executors',

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

            // Transactions
            transactions: 'Transactions',
            amount: 'Amount',
            postingMethod: 'Posting Method',
            paymentDate: 'Payment Date',
            payment: 'Payment',
            fee: 'Fee',
            legal_fee: 'Legal fee',

            // Case Executors
            caseExecutors: 'Case Executors',

            // Case Business Numbers
            caseBusinessNumbers: 'Case Business Numbers',

            // Common
            numberOfCases: 'Number of Cases',
            numberOfEmployees: 'Number of Employees',
          },

          errors: {
            // Common errors
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

          // Messages
          welcomeMessage: 'Dobrodošli na naš sajt!',
          thankYouMessage: 'Hvala vam što koristite našu aplikaciju!',
          successMessage: 'Uspešno!',
          errorMessage: 'Ups! Nešto je pošlo po zlu.',

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

            // Clients
            client: 'Klijent',
            clients: 'Klijenti',

            // Courts
            court: 'Sud',
            courts: 'Sudovi',

            // Courts and Cities
            courtsAndCities: 'Sudovi i Gradovi',

            // Employers
            employers: 'Poslodavci',
            employer: 'Poslodavac',

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

            // SSN Numbers
            ssnNumbers: 'SSN brojevi',
            ssn: 'SSN',

            // SSN Numbers and Packages
            ssnNumbersAndPackages: 'SSN brojevi i Paketi',

            // Lawyers
            lawyers: 'Advokati',
            lawyer: 'Advokat',
            officeName: 'Naziv kancelarije',
            address: 'Adresa',

            // Executors
            executors: 'Izvršitelji',

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

            // Transactions
            transactions: 'Transakcije',
            amount: 'Iznos',
            postingMethod: 'Način evidentiranja',
            paymentDate: 'Datum uplate',
            payment: 'Uplata',
            fee: 'Taksa',
            legal_fee: 'Sudska taksa',

            // Case Executors
            caseExecutors: 'Izvršitelji predmeta',

            // Case Business Numbers
            caseBusinessNumbers: 'Poslovni brojevi predmeta',

            // Common
            numberOfCases: 'Broj slučajeva',
            numberOfEmployees: 'Broj zaposlenih',
          },

          errors: {
            // Common errors
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
            // Add more common error messages here
          },
        },
      },
    },
  });

export default i18n;
