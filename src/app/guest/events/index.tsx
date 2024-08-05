import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { eventsQuery, eventsState } from "../state/eventsState";
import { currentEventIdState } from "../state/currentEventIdState";
import EventCard from "@/components/EventCard";
import { fonts } from "@/constants/fonts";
import Toast from "react-native-root-toast";

export default function Events() {
  const events = useRecoilValue(eventsQuery);
  const [allEvents, setAllEvents] = useRecoilState(eventsState);
  useEffect(() => {
    console.log(events);
    setAllEvents(events);
  }, [events]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find Events</Text>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontFamily: fonts.SFPROBOLD,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
