import { StyleSheet } from "@react-pdf/renderer";

export const commonStyles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
  },
});

export const leftStyles = StyleSheet.create({
  section: {
    width: "25%",
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    
    marginTop: "20",
    marginBottom: "20px",
    height: "100%",
   
  },
  basic: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "4px",
  },
  basic_name: {
    fontSize: "14px",
    color: "black",
    fontFamily: "Helvetica-Bold"
  },
  basic_profession: {
    color: "black",
    fontSize: "12px",
    fontFamily: "Helvetica-Bold"
  },
  basic_img: {
    width: "60px",
    height: "60px",
    borderRadius: "90",
  },
  basic_city: {
    color: "black",
    fontSize: "11px",
  },
  basic_address: {
    color: "black",
    fontSize: "11px",
  },
  basic_email: {
    color: "black",
    fontSize: "11px",
  },
  basic_phone: {
    color: "black",
    fontSize: "11px",
  },
  basic_pincode: {
    color: "black",
    fontSize: "11px",
    marginBottom:"16px"
  },
  socials:{
    display:"flex",flexDirection:"column",gap:"4px"
  },
  socials_platform:{
    fontSize: "11px",
  },
  socials_profileLink:{
    fontSize: "11px",
    marginBottom:"8px"
  },
  education:{
    display:"flex",flexDirection:"column",gap:"4px"
  },
  education_degree:{
    fontSize: "11px",
  },
  education_institution:{
    fontSize: "11px",
  },
  education_percentage:{
    fontSize: "11px",
    marginBottom:"8px"
  },
  skills:{
    display:"flex",flexDirection:"column",gap:"4px"
  },
  skills_platform:{
    fontSize: "11px",
  },
  skills_perfection:{
    fontSize: "11px",
    marginBottom:"8px"
  },
});

export const rightStyles = StyleSheet.create({
  section: {
    width: "75%",
    display:"flex",
    flexDirection:"column",
    gap:"16px"
  },
  container: {
    margin: 10,
    display:"flex",
    flexDirection:"column",
    gap:"16px"
  },
  basic_intro: {
    marginTop: "6px",
    color: "black",
    fontSize: "11px",
    padding:"8px",
  },
  experience:{
    display:"flex",flexDirection:"column",gap:"4px"
  },
  experience_orgName:{
    fontSize: "11px",
  },
  experience_position:{
    fontSize: "11px",
  },
  experience_joiningLocation:{
    fontSize: "11px",
  },
  experience_technologies:{
    fontSize: "11px",
  },
  experience_ctc:{
    fontSize: "11px",
    marginBottom:"8px"
  },
  experience_startEndDate:{
    fontSize: "11px",
  },
  projects:{
    display:"flex",flexDirection:"column",gap:"4px"
  },
  projects_title:{
    fontSize: "11px",
  },
  projects_description:{
    fontSize: "11px",
  },
  projects_teamSize:{
    fontSize: "11px",
  },
  projects_technologies:{
    fontSize: "11px",
    marginBottom:"8px"
  },
  projects_duration:{
    fontSize: "11px",
  }
 
});
