import React, { useRef, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ImageBackground, Image } from "expo-image";
import Header from "@/components/Header";
import { AppButton } from "@/components/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentEventSelector } from "../state/currentEventIdState";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/colors";
import {
  convertToJSDate,
  formatDate,
  formatTimeRange,
} from "@/helpers/timeFormatter";
import { formatToHundredPlus } from "@/helpers/numbersFormatter";
import { useRouter } from "expo-router";
import {
  currentTicketStatus,
  ticketStatusQuery,
} from "../state/ticketStatusState";
import WebView from "react-native-webview";
import Toast from "react-native-root-toast";
const Event = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = ["50%", "75%"];
  const currentEvent = useRecoilValue(currentEventSelector);
  const router = useRouter();
  const userId = "XDTHDEKDF4123"; // Replace with user Id after auth
  const [ticketStatus, setCurrentTicketStatus] =
    useRecoilState(currentTicketStatus);
  const ticket = useRecoilValue(
    ticketStatusQuery({ userId, eventId: currentEvent?.id })
  );

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    if (ticket?.ticketStatus) {
      console.log("Prev status is", ticket.ticketStatus);
      setCurrentTicketStatus(ticket.ticketStatus);
      if (ticket.ticketStatus === "approved") {
        Toast.show("Your ticket was approved!", {
          duration: Toast.durations.LONG,
          position: 100,
          backgroundColor: "green",
        });
      }
    } else if (
      ticket?.ticketStatus === undefined &&
      ticketStatus === "waiting"
    ) {
      console.log(ticket?.ticketStatus, ticketStatus);
      Toast.show("Your ticket request was submitted!", {
        duration: Toast.durations.LONG,
        position: 100,
        backgroundColor: "green",
      });
    }
  }, [ticket?.ticketStatus]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ImageBackground
          style={styles.imageBackground}
          source={{ uri: currentEvent?.image }}
          contentFit="fill"
          transition={1000}
        >
          <Header title="Event" />
          <View style={styles.container}>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={{ borderRadius: 50 }}
              enablePanDownToClose={false}
            >
              <BottomSheetScrollView
                contentContainerStyle={styles.bottomSheetContent}
              >
                <View style={styles.heading}>
                  <Text style={styles.title}>{currentEvent?.title}</Text>
                  <Text style={styles.icon}>{currentEvent?.icon}</Text>
                </View>
                <Text style={styles.host}>By {currentEvent?.host}</Text>
                <View style={styles.itemContainer}>
                  <View style={styles.item}>
                    <Image
                      style={styles.icon}
                      source={require("../../../../assets/calendar.png")}
                    />
                    <View style={styles.itemContent}>
                      <Text style={styles.itemContentHead}>
                        {formatDate(
                          convertToJSDate(currentEvent?.timeStamp.startDateTime)
                        )}
                      </Text>
                      <Text style={styles.itemContentSubHead}>
                        {formatTimeRange(currentEvent?.timeStamp)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <Image
                      style={styles.icon}
                      source={require("../../../../assets/location.png")}
                    />
                    <View style={styles.itemContent}>
                      <Text style={styles.itemContentHead}>
                        {currentEvent?.location.formattedAddress}
                      </Text>
                      <Text
                        style={[
                          styles.itemContentSubHead,
                          { color: "#6C63FF" },
                        ]}
                      >
                        Join to see full address
                      </Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <Image
                      style={styles.icon}
                      source={require("../../../../assets/tickets.png")}
                    />
                    <View style={styles.itemContent}>
                      <Text style={styles.itemContentHead}>
                        {currentEvent?.tickets.sold} /
                        {currentEvent?.tickets.total} tickets left
                      </Text>
                      <Text style={styles.itemContentSubHead}>
                        {formatToHundredPlus(currentEvent?.invitaions?.sent)}{" "}
                        Invitaions sent
                      </Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <Image
                      style={styles.icon}
                      source={require("../../../../assets/dollar.png")}
                    />
                    <View
                      style={[styles.itemContent, { justifyContent: "center" }]}
                    >
                      <Text style={[styles.itemContentHead]}>
                        ${currentEvent?.price.lowerLimit} - $
                        {currentEvent?.price.upperLimit}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.about}>About this event</Text>
                  <Text style={styles.aboutContent}>
                    {currentEvent?.description}
                  </Text>
                  <Text style={styles.about}>Find this event</Text>
                </View>
              </BottomSheetScrollView>
            </BottomSheetModal>

            <View style={styles.fixedBottomSection}>
              <View
                style={{
                  backgroundColor: "white",
                  height: 100,
                  width: "100%",
                  paddingHorizontal: 20,
                  elevation: 2,
                  justifyContent: "center",
                }}
              >
                {ticketStatus === "waiting" ? (
                  <AppButton
                    onPress={() => Alert.alert("Approval is pending")}
                    title="Waiting for approval"
                    level="secondary"
                    loading={false}
                    disabled={false}
                  />
                ) : ticketStatus === "approved" ? (
                  <View style={{ flexDirection: "row", width: "48%" }}>
                    <AppButton
                      onPress={() => router.push(`/guest/questions`)}
                      title="My Tickets"
                      loading={false}
                      disabled={false}
                      level={""}
                    />
                    <AppButton
                      onPress={() => router.push(`/guest/questions`)}
                      title="Share Event"
                      loading={false}
                      disabled={false}
                      level={""}
                    />
                  </View>
                ) : (
                  <AppButton
                    onPress={() => router.push(`/guest/questions`)}
                    title="Buy Tickets"
                    loading={false}
                    disabled={false}
                    level={""}
                  />
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 30,
  },
  host: {
    fontSize: 16,
    fontFamily: fonts.SFPRO,
  },
  itemContent: {
    rowGap: 5,
  },
  itemContentSubHead: {
    fontSize: 12,
    fontFamily: fonts.SFPROMEDIUM,
    color: "gray",
  },
  itemContentHead: {
    fontSize: 16,
    fontFamily: fonts.SFPROBOLD,
  },
  itemContainer: {
    height: "auto",
    flexDirection: "column",
    marginVertical: 15,
  },
  item: {
    flexDirection: "row",
    columnGap: 15,
    marginVertical: 15,
  },

  bottomSheetContent: {
    marginVertical: 15,
    marginHorizontal: 30,
    paddingBottom: 120,
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontFamily: fonts.SFPROBOLD,
    color: "black",
  },
  about: {
    fontSize: 18,
    fontFamily: fonts.SFPROBOLD,
    marginVertical: 10,
    color: "black",
  },
  aboutContent: {
    fontSize: 16,
    fontFamily: fonts.SFPRO,
    marginVertical: 10,
    color: "black",
  },
  bookingDetail: {
    fontSize: 14,
    color: "#101318",
    marginVertical: 5,
  },
  fixedBottomSection: {
    position: "absolute",
    justifyContent: "center",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    zIndex: 15,
    height: 100,
    elevation: 5,
    paddingTop: 6,
  },
});
