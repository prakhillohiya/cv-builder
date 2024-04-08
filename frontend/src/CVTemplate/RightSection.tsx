import { Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { ICV } from "../shared/components/CV";
import { rightStyles } from "./Styles";

export interface IRightSection {
  cv: ICV;
}

const RightSection: React.FC<IRightSection> = ({ cv }) => {
  const { profile, template } = cv;

  return (
    <View style={rightStyles.section}>
      <View style={{ backgroundColor: "lightgray",minHeight: "48px" }}>
        <Text style={rightStyles.basic_intro}>{profile.basic.intro}</Text>
      </View>
      <View style={rightStyles.container}>
        <View>
          <Text
            style={{
              fontSize: "12px",
              textAlign: "left",
              fontFamily: "Helvetica-Bold",
              marginBottom: "8px",
            }}
          >
            Experience
          </Text>
          {profile.experience.map((x, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={rightStyles.experience}>
                <Text style={rightStyles.experience_orgName}>
                  Organization: {x.orgName}
                </Text>
                <Text style={rightStyles.experience_position}>
                  Position: {x.position}
                </Text>

                <Text style={rightStyles.experience_technologies}>
                  Technologies: {x.technologies}
                </Text>
                <Text style={rightStyles.experience_ctc}>CTC: {x.ctc}</Text>
              </View>
              <View style={rightStyles.experience}>
                <Text style={rightStyles.experience_startEndDate}>
                  Duration:{" "}
                  {dayjs(x.startDate).isValid()
                    ? dayjs(x.startDate).format("DD/MM/YYYY")
                    : ""}{" "}
                  -{" "}
                  {dayjs(x.endDate).isValid()
                    ? dayjs(x.endDate).format("DD/MM/YYYY")
                    : ""}
                </Text>
                {/* <Text>-</Text>
              <Text style={rightStyles.experience_endDate}>

              </Text> */}
                <Text style={rightStyles.experience_joiningLocation}>
                  Location: {x.joiningLocation}
                </Text>
              </View>
            </div>
          ))}
        </View>

        <View>
          <Text
            style={{
              fontSize: "12px",
              textAlign: "left",
              fontFamily: "Helvetica-Bold",
              marginBottom: "8px",
            }}
          >
            Projects
          </Text>
          {profile.projects.map((x, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={rightStyles.projects}>
                <Text style={rightStyles.projects_title}>Title: {x.title}</Text>
                <Text style={rightStyles.projects_description}>
                  Description: {x.description}
                </Text>

                <Text style={rightStyles.projects_technologies}>
                  Technologies: {x.technologies}
                </Text>
              </View>
              <View style={rightStyles.projects}>
                <Text style={rightStyles.projects_teamSize}>
                  Team Size: {x.teamSize}
                </Text>
                <Text style={rightStyles.projects_duration}>
                  Duration: {x.duration}
                </Text>
              </View>
            </div>
          ))}
        </View>
      </View>
    </View>
  );
};

export default RightSection;
