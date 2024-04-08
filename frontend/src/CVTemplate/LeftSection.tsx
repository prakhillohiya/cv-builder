import { Image, Text, View } from "@react-pdf/renderer";
import { ICV } from "../shared/components/CV";
import { leftStyles } from "./Styles";

export interface ILeftSection {
  cv: ICV;
}

const LeftSection: React.FC<ILeftSection> = ({ cv }) => {
  const { profile, template } = cv;

  return (
    <View
      style={{
        ...leftStyles.section,
        backgroundColor: `#${template.backgroundColor}`,
      }}
    >
      <View style={leftStyles.container}>
        <View style={leftStyles.basic}>
          <Image
            style={leftStyles.basic_img}
            // src={"https://i.imgur.com/f6L6Y57.png"}
            src={profile.basic.avatar || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60k9HwAAAABJRU5ErkJggg=="}
          />

          <Text style={leftStyles.basic_name}>{profile.basic.name}</Text>

          <Text style={leftStyles.basic_profession}>
            {profile.basic.profession}
          </Text>
          <Text style={leftStyles.basic_email}>{profile.basic.email}</Text>
          <Text style={leftStyles.basic_phone}>{profile.basic.phone}</Text>
          <Text style={leftStyles.basic_address}>{profile.basic.address}</Text>
          <Text style={leftStyles.basic_city}>{profile.basic.city}</Text>
          <Text style={leftStyles.basic_pincode}>{profile.basic.pincode}</Text>
        </View>

        <View style={{display:"flex",flexDirection:"column",padding:"8px"}}>

        <View style={leftStyles.socials}>
          <Text style={{ fontSize: "12px", fontFamily: "Helvetica-Bold",marginBottom: "4px"}}>Socials</Text>

          {profile.socials.map((x, i) => (
            <View style={leftStyles.socials} key={i}>
              <Text style={leftStyles.socials_platform}>Platform: {x.platform}</Text>
              <Text style={leftStyles.socials_profileLink}>
                Profile Link: {x.profileLink}
              </Text>
            </View>
          ))}
        </View>

        <View style={leftStyles.education}>
          <Text style={{ fontSize: "12px", textAlign: "left", fontFamily: "Helvetica-Bold",marginBottom: "4px" }}>Education</Text>

          {profile.education.map((x, i) => (

            <View style={leftStyles.education} key={i}>
              <Text style={leftStyles.education_degree}>Degree: {x.degree}</Text>
              <Text style={leftStyles.education_institution}>
                Institution: {x.institution}
              </Text>
              <Text style={leftStyles.education_percentage}>
                Percentage: {x.percentage}
              </Text>
            </View>

          ))}
        </View>

        <View style={leftStyles.skills}>
          <Text style={{ fontSize: "12px", textAlign: "left", fontFamily: "Helvetica-Bold",marginBottom: "4px" }}>Skills</Text>
          {profile.skills.map((x, i) => (
            <View style={leftStyles.skills} key={i}>
              <Text style={leftStyles.skills_platform}>Skill: {x.skill}</Text>
              <Text style={leftStyles.skills_perfection}>Perfection: {x.perfection}</Text>
            </View>
          ))}
        </View>

        </View>
      </View>
    </View>
  );
};

export default LeftSection;
