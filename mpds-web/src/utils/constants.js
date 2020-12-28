//URL for API in prodution and development
const prod = {
  url: {
    //API_URL: "https://api-mpds.f3m.pt/api"
    API_URL: "https://api-mpds-beta.f3m.pt/api",
  }
};
const dev = {
  url: {
    //API_URL: "http://192.168.1.9:16632/api",
    API_URL: "https://api-mpds-beta.f3m.pt/api",
    //API_URL: "https://api-mpds.f3m.pt/api"
  }
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;

//Version
export const VERSION = "1.1.0"

//URLs API
export const CompatibleVersion = "/compatibleVersion";
export const Token = "/Login/Token";
export const GetInstitutions = "/Login/Institutions";
export const Logout = "/Logout";
export const InfoClient = "/Client";
export const InfoSpace = "/Client/UsedSpace";
export const Institution = "/Institution";
export const AllUsersAllInstitutions = "/Institutions/Users";
export const AddUserToInstitution = "/Institution/AddUser";
export const RemoverUserFromInstitution = "/Institution/RemoveUser";
export const InstitutionProfiles = "/Institution/Profiles"
export const User = "/User";
export const UserInstitution = "/User/Institution";
export const UserPhoto = "/User/Photo";
export const UserPhotoAdmin = "/User/UpdatePhoto";
export const UserProfile = "/User/Profile";
export const UserFetch = "/User/fetch";
export const ClearPassword = "/User/ResetPassword";
export const CardListView = "/User/CardListView";
export const ResetPassword = "/ResetPassword";
export const GetPatientInfo = "/Patient";
export const PatientsSearch = "/Patient/Search";
export const GetMedication = "/Patient/Medication";
export const GetDiagnosis = "/Patient/Diagnosis";
export const GetInternments = "/Patient/Internments";
export const HistoryInterventions = "/Patient/HistoryInterventions";
export const HistoryInterventionsWithFilter =
  "/Patient/HistoryInterventionsWithFilter";
export const StructureCardsPatient = "/StructureCardsPatient";
export const GetWoundById = "/wound";
export const WoundClose = "/wound/Close";
export const WoundOpen = "/wound/Open";
export const GetWounds = "/Wound/Patient";
export const PutWoundsIntervention = "/Wound/Intervention";
export const WoundTypologies = "/Institution/WoundTypologies";

//AZURE
export const AZURE_CONTAINER_NAME = "mpdsfotos";
export const AZURE_BLOB_NAME = "UsersPhotos";

// sessionStorage e LocalStorage
export const acessToken = "_token";
export const acessTokenRefresh = "_tokenRefresh";
export const InstitutionId = "_Institution";
export const InstitutionName = "_Institution_name";
export const InstitutionNIF = "_Institution_nif";
export const userEmail = "_mpds_Email";
export const userEmailVal = "_Email_Valid";
export const Institutions = "_mpds_Institutions";
export const loginsStorage = "_mpds_logins";
export const patientIDSel = "_patientID";
export const woundIDSel = "_woundID";
export const showClosedWounds = "_showClosedWounds";
export const showOpenWounds = "_showOpenWounds";
export const lgEmail = "LE_Email"
export const lgInstitution = "LE_Institution"
export const lgPatient = "LE_Patient"
export const settingsTab = "_settingsTab"
export const woundsTab = "_woundsTab"

// business
export const TYPE_WOUND_WITH_CATEGORY_PT = "Úlcera de pressão";
export const TYPE_WOUND_WITH_CATEGORY_EN = "Pressed ulcer";
