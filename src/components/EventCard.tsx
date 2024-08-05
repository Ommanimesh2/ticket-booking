import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";
import { currentEventIdState } from "@/app/guest/state/currentEventIdState";
import { fonts } from "@/constants/fonts";
import { EventDetails } from "@/types/compoundTypes";

interface EventCardProps {
  event: EventDetails;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const router = useRouter();
  const [currentEvent, setCurrentEvent] = useRecoilState(currentEventIdState);

  const handlePress = () => {
    console.log("onSelect", event.id);
    setCurrentEvent(event.id);
    router.push(`/guest/events/${event.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.eventItem}>
        <Image source={{ uri: event.image }} style={styles.eventImage} />
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventHost}>Host: {event.host}</Text>
          <Text style={styles.eventLocation}>
            Location: {event.location.formattedAddress}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  eventDetails: {
    flex: 1,
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: fonts.SFPROBOLD,
    marginBottom: 5,
    color: "#333",
  },
  eventHost: {
    fontFamily: fonts.SFPROBOLD,
    fontSize: 14,
    color: "#666",
  },
  eventLocation: {
    fontSize: 14,
    fontFamily: fonts.SFPRO,

    color: "#888",
    marginBottom: 5,
  },
});

export default EventCard;
