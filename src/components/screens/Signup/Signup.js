import React, { Component } from "react";
import {
  SafeViewArea,
  Scrollview,
  Statusbar,
  Container,
  Textview,
  Button,
  Input,
} from "../../default";
import Swiper from "react-native-swiper";
import { FormOne, FormTwo } from "./SignupForm";
import { SignupHeader } from "./SignupHeader";
import { SignupButtons } from "./SignupButtonContainer";
import { StyleSheet, Platform, Alert } from "react-native";
import firebase from "react-native-firebase";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-community/async-storage";
import { LOGIN_CHECK } from "../../../constants/StorageConstans";
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from "@react-native-community/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk";

//var user = firebase.auth().currentUser;
var validatePass = "";

//var urgent_care_data = this.props.navigation.getParam('urgent_care_data');

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.index = 0;

    this.state = {
      loading: true,
      isModalVisible: false,
      password: "",
      number: "",
      urgentcareName: this.props.navigation.getParam("urgentcareName"),
      swiperIndex: 0,
      agreementState: false,

      controls: {
        email: {
          value: "",
          valid: false,
          validationRules: {
            isEmail: true,
          },
        },
        password: {
          value: "",
          valid: false,
          validationRules: {
            minLength: 6,
          },
        },
        confirmPassword: {
          value: "",
          valid: false,
          validationRules: {
            equalTo: "password",
          },
        },
        firstName: {
          value: "",
          valid: false,
          validationRules: {
            minLength: 3,
          },
        },
        lastName: {
          value: "",
          valid: false,
          validationRules: {
            minLength: 3,
          },
        },
        securityNo: {
          value: "",
          valid: false,
          validationRules: {
            maxLength: 4,
          },
        },
      },
    };
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setUserInfo(userInfo)
      console.log("userInfo", userInfo);

      //   let userID = userInfo.user.id;
      console.log("userPass", this.state.password);
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          userInfo.user.email,
          this.state.password
        )
        .then((user) => {
          console.log("Google uSER:", user);
          let userID = firebase.auth().currentUser.uid;
          firebase
            .database()
            .ref("users/")
            .child("patients")
            .child(userID)
            .set({
              email: userInfo.user.email,
              firstname: userInfo.user.givenName,
              lastname: userInfo.user.familyName,
              patientId: userID,
              status: "pending",
              Phone: this.state.number,
              UName: this.state.urgentcareName,
              TypeOfUser: "GMAIL",
            });

          Alert.alert(
            "Your account creation request has been posted to the admin."
          );
          this.props.navigation.navigate("Home");
        })
        .catch((error) => {
          alert(error.message);
        });

      // setError(null)
      // setIsLoggedIn(true)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert("Process Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert("Process in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert("Play services are not available");
      } else {
        // some other error
        Alert.alert("Something else went wrong... ", error.toString());
        // setError(error)
        console.log("error", error);
      }
    }
  };

  async getCurrentUserInfo() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUserInfo(userInfo);
      console.log("userInfo", userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // when user hasn't signed in yet
        Alert.alert("Please Sign in");
        setIsLoggedIn(false);
      } else {
        Alert.alert("Something else went wrong... ", error.toString());
        setIsLoggedIn(false);
        console.log("error", error);
      }
    }
  }

  async signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert("Something else went wrong... ", error.toString());
      console.log("error", error);
    }
  }

  handleUpdateInput = (key, value) => {
    this.setState((prevState) => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: this.validateInput(value, key),
          },
        },
      };
    });
  };

  onGoogleSignInPress() {
    console.log("urgent care state..", this.state.urgentcares);
    this.setState({ isModalVisible: true });
  }

  onFacebookSignInPress() {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(
              data.accessToken
            );

            firebase
              .auth()
              .signInWithCredential(credential)
              .then((user) => {
                console.log("user", user);

                var dbref = firebase
                  .database()
                  .ref(`users/patients/${user.user.uid}/`);
                dbref.on("value", (snapshot) => {
                  if (!snapshot.exists) {
                    firebase
                      .database()
                      .ref("users/")
                      .child("patients")
                      .child(user.user.uid)
                      .set({
                        email: user.additionalUserInfo.profile.email,
                        firstname: user.additionalUserInfo.profile.first_name,
                        lastname: user.additionalUserInfo.profile.last_name,
                        patientId: user.user.uid,
                        status: "pending",
                        Phone: "1234567", //Please make it dynamic using modal
                        UName: this.state.urgentcareName,
                        TypeOfUser: "FACEBOOK",
                      });

                    Alert.alert(
                      "Your account creation request has been posted to the admin."
                    );
                  } else {
                    if (snapshot._value.status == "pending") {
                      Alert.alert(
                        "Your account is not Approved by the Admin yet."
                      );
                      console.log("pending", "status is pending");
                    } else {
                      AsyncStorage.setItem(LOGIN_CHECK, "true").then(() => {
                        this.props.navigation.goBack();
                      });
                    }
                  }
                });
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  componentDidMount() {
    // GoogleSignin.configure({
    //     webClientId: 'AIzaSyBvavoIqB3Vm4F8HSPMWS3ZD14Qiparoqw.apps.googleusercontent.com',
    //     client_id: "1094017099438-avdi1s0dt309v64k24m1qkj5bh1835nm.apps.googleusercontent.com",
    //     offlineAccess: false
    // })
    GoogleSignin.configure({
      webClientId:
        "1094017099438-avdi1s0dt309v64k24m1qkj5bh1835nm.apps.googleusercontent.com",
      // client_id: "1094017099438-avdi1s0dt309v64k24m1qkj5bh1835nm.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
  }

  componentWillMount() {
    validatePass = "";
  }

  validateInput(value, key) {
    let isValid = false;
    switch (key) {
      case "email":
        isValid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          value
        );
        break;
      case "password":
        isValid = value.length >= 6;
        break;
      case "confirmPassword":
        isValid = value === this.state.controls.password.value;
        break;
      case "firstName":
        isValid = value.length >= 3;
        break;
      case "lastName":
        isValid = value.length >= 3;
        break;

      case "securityNo":
        isValid = value.length >= 7;
        break;

      default:
        isValid = false;
    }
    return isValid;
  }

  continueSignupHandler = () => {
    const {
      email,
      password,
      confirmPassword,
      securityNo,
    } = this.state.controls;
    if (email.valid && password.valid && confirmPassword.valid) {
      console.log("validate", this.state.controls);

      if (this.state.swiperIndex == 0) {
        this.setState({ swiperIndex: 1 });
        this.refs.swiper.scrollBy(1);
      } else if (this.state.swiperIndex == 1) {
        if (securityNo.valid) {
          if (this.state.agreementState == true) {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email.value, password.value)
              .then((user) => {
                console.log("asdnaskdnaskd", user);
                let userID = firebase.auth().currentUser.uid;
                firebase
                  .database()
                  .ref("users/")
                  .child("patients")
                  .child(userID)
                  .set({
                    email: this.state.controls.email.value,
                    firstname: this.state.controls.firstName.value,
                    lastname: this.state.controls.lastName.value,
                    patientId: userID,
                    status: "pending",
                    Phone: this.state.controls.securityNo.value,
                    UName: this.state.urgentcareName,
                  });

                Alert.alert(
                  "Your account creation request has been posted to the admin."
                );
                // AsyncStorage.setItem(LOGIN_CHECK, 'true').then(() => {
                //     this.props.navigation.goBack();
                // });

                //  this.defaultEmergency();
                this.props.navigation.navigate("Home");
              })
              .catch((error) => {
                alert(error.message);
              });
          } else {
            Alert.alert("Please Agree to the Terms and Condition First");
          }
        } else {
          Alert.alert("Enter valid no");
        }
      }
    } else {
      Alert.alert("Password is not valid");
    }
  };

  onBackHandler = () => {
    if (this.state.swiperIndex == 1) {
      this.setState({ swiperIndex: 0 });
      if (Platform.OS === "android") {
        this.refs.swiper.scrollView.setPage(0);
      } else {
        this.refs.swiper.scrollBy(0);
      }
    } else {
      this.props.navigation.pop();
    }
  };

  onCancelPressed() {
    this.setState({ isModalVisible: false });
  }

  onPassword(event) {
    this.setState({ password: event });
  }

  onNumber(event) {
    this.setState({ number: event });
  }

  render() {
    return (
      <SafeViewArea style={{ flex: 1 }}>
        <Statusbar barStyle="dark-content" />
        <Scrollview keyboardShouldPersistTaps="true">
          <SignupHeader />
          <Swiper
            style={styles.swipeWrapper}
            scrollEnabled={true}
            dot={<Container></Container>}
            activeDot={<Container></Container>}
            ref="swiper"
            index={this.state.swiperIndex}
            showsButtons={false}
            loop={false}
          >
            <FormOne
              emailChangeHandler={(email) =>
                this.handleUpdateInput("email", email)
              }
              passwordChangeHandler={(password) =>
                this.handleUpdateInput("password", password)
              }
              confirmPasswordHandler={(confirmPass) =>
                this.handleUpdateInput("confirmPassword", confirmPass)
              }
            />

            <FormTwo
              firstNameChangeHandler={(firstName) =>
                this.handleUpdateInput("firstName", firstName)
              }
              lastNameChangeHandler={(lastName) =>
                this.handleUpdateInput("lastName", lastName)
              }
              securityNoChangeHandler={(securityNo) =>
                this.handleUpdateInput("securityNo", securityNo)
              }
              agreementValue={this.state.agreementState}
              onCheckHandler={(value) => {
                this.setState({ agreementState: value });
                console.log("Switch 1 is: " + value);
                console.log(value);
              }}
            />
          </Swiper>
          <SignupButtons
            swiperIndex={this.state.swiperIndex}
            continueSignup={this.continueSignupHandler}
            goBack={this.onBackHandler}
          />

          <Button
            style={{
              justifyContent: "center",
              height: 50,
              borderRadius: 10,
              backgroundColor: "#EA2626",
              height: 45,
              width: 270,
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
              marginBottom: 120,
              marginLeft: 100,
              marginRight: 30,
            }}
            textStyle={{ fontSize: 18, color: "white", marginLeft: 15 }}
            onPress={() => {
              this.onGoogleSignInPress();
            }}
            title="Register with Google"
          ></Button>
          <Button
            style={{
              justifyContent: "center",
              height: 50,
              borderRadius: 10,
              backgroundColor: "#EA2626",
              height: 45,
              width: 270,
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
              marginBottom: 75,
              marginLeft: 100,
              marginRight: 30,
            }}
            textStyle={{ fontSize: 18, color: "white", marginLeft: 15 }}
            onPress={() => {
              this.onFacebookSignInPress();
            }}
            title="Register with Facebook"
          ></Button>
          <Modal
            isVisible={this.state.isModalVisible}
            style={{ justifyContent: "flex-end" }}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={800}
          >
            <Container
              ContainerStyle={{
                backgroundColor: "#fff",
                padding: 20,
                height: 320,
                borderRadius: 15,
                marginLeft: 15,
                marginRight: 15,
              }}
            >
              <Input
                placeholder="Enter Password"
                placeholderTextColor="#D3D3D3"
                inputStyle={styles.inputModal}
                secureTextEntry={true}
                onChangeText={(event) => {
                  this.onPassword(event);
                }}
              />

              <Input
                placeholder="Enter Number"
                placeholderTextColor="#D3D3D3"
                inputStyle={styles.inputModal}
                onChangeText={(event) => {
                  this.onNumber(event);
                }}
              />

              <Container
                ContainerStyle={{
                  flexDirection: "row",
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <GoogleSigninButton
                  style={{
                    width: 220,
                    height: 48,
                    alignSelf: "center",
                    marginTop: 12,
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={this.signIn}
                />

                <Button
                  title="Cancel"
                  style={styles.ModalButton}
                  textStyle={styles.ModalButtonText}
                  onPress={() => {
                    this.onCancelPressed();
                  }}
                />
              </Container>
            </Container>
          </Modal>

          <Container
            ContainerStyle={{
              alignSelf: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 10,
              position: "absolute",
              bottom: 0,
            }}
          >
            <Textview>Powered by Matz Group©</Textview>
          </Container>
        </Scrollview>
      </SafeViewArea>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyles: {
    flexGrow: 1,
    justifyContent: "center",
  },
  swipeWrapper: {
    height: 250,
  },
  invalidInputStyles: {
    marginTop: 5,
    alignSelf: "center",
    color: "red",
  },

  inputModal: {
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#000",
    fontSize: 18,
    color: "#000",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    height: 60,
  },
  ModalButton: {
    marginTop: 15,
    width: "30%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EA2626",
    height: 40,
    marginRight: 5,
    marginBottom: 10,
  },
});
