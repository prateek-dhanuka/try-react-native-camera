import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera, Permissions } from "expo";
import { MaterialIcons } from "@expo/vector-icons";

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              flexDirection: "row",
            }}
          >
            {[
              "brightness-auto",
              "iso",
              "flash-auto",
              "photo-filter",
              "pie-chart",
            ].map((iconName) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name={iconName}
                  style={{ fontSize: 30, color: "white" }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
  }
}
