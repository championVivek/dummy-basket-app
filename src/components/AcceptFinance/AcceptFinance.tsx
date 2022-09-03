import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import LinearGradient from "react-native-linear-gradient";
import { ProgressProps } from "../../../@types";
import { Minus, Plus } from "../../../assets/svg";
import store from "../../redux/store";
import Accepted from "../Accepted/Accepted";
import Button from "../Button/Button";
import GradientCard from "../GradientCard/GradientCard";
import OfferCard from "../OfferCard";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";

const AcceptFinance: React.FC<ProgressProps> = ({ changePage, pageIndex }) => {
  const [activeSections, setActiveSections] = useState([]);
  const [financeAccepted, setFinanceAccepted] = useState<boolean>(false);
  const state = store.getState().lendersReducer;

  const nextPage = () => {
    if (pageIndex) changePage(pageIndex + 1);
  };

  const handleAcceptedScreen = async () => {
    setFinanceAccepted(false);
    nextPage();
  };

  const submittApplication = async () => {
    console.log('submitted');

  };

  const financeType = [
    { id: "1", title: "Finance Type", value: "HP" },
    { id: "2", title: "I have a Bank Transfer deposit of", value: "£1,000" },
    { id: "3", title: "I'd like to repay over", value: "4 years" },
    { id: "4", title: "My annual mileage is", value: "10,000 miles" },
  ];

  const representativeArray = [
    {
      id: "1",
      title: "First Payment",
      value: "£1,086.66",
      details: "The amount of your first monthly payment to finance this vehicle",
    },
    {
      id: "2",
      title: "47 monthly payments",
      value: "£1,086.66",
      details: "The amount of your monthly payments to finance this vehicle",
    },
    {
      id: "3",
      title: "Optional final payment",
      value: "£24,756.25",
      details: "The amount of your monthly payments to finance this vehicle",
    },
    {
      id: "4",
      title: "Term",
      value: "48 months",
      details: "The amount of your monthly payments to finance this vehicle",
    },
    {
      id: "5",
      title: "Contract length",
      value: "49 months",
      details: "The amount of your monfdfdthly payments to finance this vehicle",
    },
    {
      id: "6",
      title: "Car price",
      value: "£64,900.00",
      details: "The amount of your monthly payments to finance this vehicle",
    },
    {
      id: "7",
      title: "Bank Transfer deposit",
      value: "£1,000.00",
      details: "The amount of your monthly payments to finance this vehicle",
    },
    {
      id: "8",
      title: "Total amount of credit",
      value: "£64,900",
      details: "The amount of your monthly payments to finance this vehicle",
    },
    {
      id: "9",
      title: "Total amount payable",
      value: "£77,915.93",
      details: "The amount of your monthly payments to finance this vehicle",
    },
    {
      id: "10",
      title: "Representative APR",
      value: "7.9%",
      details: "The amount of your monthly payments to finance this vehicle",
    },
    {
      id: "11",
      title: "Total charge payable",
      value: "£13,920.93",
      details: "The amount of your monthly payments to finance this vehicle",
    },
    {
      id: "12",
      title: "Fixed rate of interest pa",
      value: "3.92%",
      details: "The amount of your monthly payments to finance this vehicle",
    },
  ];

  return (
    <>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingTop: 30 }}>
        <GradientCard offerTitle="Best Monthly Price">
          <OfferCard btnTitle="Accept Finance Offer" btn={false}>
            <>
              {/* <FlatList
                data={state?.products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.middleView}>
                    <View>
                      <View style={styles.box}>
                        <Text style={styles.middleText1}>Total Payable</Text>
                        <Text style={styles.middleText2}>{item?.calculation?.totalChargePayable}</Text>
                      </View>
                      <View style={styles.box}>
                        <Text style={styles.middleText1}>Agreement Term</Text>
                        <Text style={styles.middleText2}>{item?.calculation?.term}</Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.box}>
                        <Text style={styles.middleText1}>Product</Text>
                        <Text style={styles.middleText2}>{item?.productName}</Text>
                      </View>
                      <View style={styles.box}>
                        <Text style={styles.middleText1}>APR</Text>
                        <Text style={styles.middleText2}>{item?.calculation?.representativeApr}</Text>
                      </View>
                    </View>
                  </View>
                )}
              /> */}
              <FlatList
                data={financeType}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <>
                    <View style={styles.tableContainer}>
                      <Text style={styles.table1Text1}>{item.title}</Text>
                      <Text style={styles.table1Text2}>{item.value}</Text>
                    </View>
                  </>
                )}
              />

              <View>
                <View style={styles.tbl2TitleContainer}>
                  <Text style={styles.tbl2TitleStyle}>Representative Example</Text>
                  <Text style={styles.tbl2SubTitleStyle}>Based on excellent credit score.</Text>
                </View>

                <Accordion
                  activeSections={activeSections}
                  sections={representativeArray}
                  renderHeader={(content, index, isActive) => {
                    return isActive ? (
                      <View style={styles.tableContainer}>
                        <View style={{ flex: 0.07 }}>
                          <Minus height={19} width={19} />
                        </View>
                        <Text style={styles.tbl2Text1}>{content?.title}</Text>
                        <Text style={styles.tbl2Text2}>{content.value}</Text>
                      </View>
                    ) : (
                      <View style={styles.tableContainer}>
                        <View style={{ flex: 0.07 }}>
                          <Plus height={19} width={19} />
                        </View>
                        <Text style={styles.tbl2Text1}>{content?.title}</Text>
                        <Text style={styles.tbl2Text2}>{content.value}</Text>
                      </View>
                    );
                  }}
                  renderContent={(content) => (
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.tbl2Details}>{content.details}</Text>
                    </View>
                  )}
                  onChange={(index) => {
                    setActiveSections(index);
                  }}
                  underlayColor="transparent"
                />
              </View>

              {/* Description */}
              <View>
                <Text style={styles.descriptionText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
                <Text style={styles.descriptionText}>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </Text>
                <Text style={styles.descriptionText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
              </View>
            </>
          </OfferCard>
        </GradientCard>
      </ScrollView>
      <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
        <LinearGradient
          colors={["rgba(255,255,255,0.7)", "#F3F4F6"]}
          style={{
            paddingVertical: 45,
            bottom: 0,
            position: "absolute",
            right: 0,
            left: 0,
          }}
        />
        <Button title="Accept Finance Offer" onPress={submittApplication} />
      </View>

      {financeAccepted && <Accepted show={handleAcceptedScreen} msg="Accepted" description="Your finance loan has been accepted for the next 7 days using bsktpay" />}
    </>
  );
};

export default AcceptFinance;
