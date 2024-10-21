import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
// import { Userpic } from "react-native-userpic";

import { Card, Input, Text } from "~/components/ui";
import * as Contacts from "expo-contacts";
import * as SMS from "expo-sms";

export default function index() {
  const [contacts, setContacts] = React.useState<Contacts.Contact[] | null>(
    null
  );

  const [search, setSearch] = React.useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
          sort: Contacts.SortTypes.FirstName,
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (search) {
      const filteredContacts = contacts?.filter((contact) =>
        contact.name?.toLowerCase().includes(search?.toLowerCase())
      );
      if (filteredContacts) {
        setContacts(filteredContacts);
      }
    } else {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
            sort: Contacts.SortTypes.FirstName,
          });

          if (data.length > 0) {
            setContacts(data);
          }
        }
      })();
    }
  }, [search]);

  const handleSendSMS = async (numb: string) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
      console.log("sms available");
      const { result } = await SMS.sendSMSAsync(
        [numb],
        `Hey! I'm using this cool app, you should try it out too!
        You can track your tasks and goals, and also get some cool rewards!
        Download the app here: https://play.google.com/store/apps/vrakka
        `
      );
      console.log(result);
    } else {
      // misfortune... there's no SMS available on this device
    }
  };
  return (
    <ScrollView className="p-2">
      <View className="mb-4">
        <Text className="font-semibold text-2xl">Contacts</Text>
        <Text className="font-normal text-base mb-2">
          Invite your friends to join the Funel and enjoy all the rewards we
          have for them.
        </Text>
        <Input
          placeholder="Search for a contact"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      {contacts?.map((contact, index) => (
        <Card
          className="p-3 my-2 items-center flex-row justify-between"
          key={index}
        >
          <View key={index} className=" flex-row items-center">
            {/* <Userpic
              size={50}
              name={`${contact.name}`}
              textStyle={{ fontSize: 18, fontWeight: "medium" }}
            /> */}

            <View className="ml-2">
              <View className="flex-row">
                <Text className="text-lg font-bold">{contact.name}</Text>
              </View>
              <Text>
                {contact.phoneNumbers?.map((phone) => phone.number).join(", ")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              contact.phoneNumbers?.[0].number
                ? handleSendSMS(contact.phoneNumbers?.[0].number)
                : null;
            }}
          >
            <Text className="bg-blue-500 text-white px-3 py-1 rounded">
              Invite
            </Text>
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  );
}
