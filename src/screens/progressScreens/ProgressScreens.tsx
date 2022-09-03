import React, { useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, StatusBar, View } from "react-native";
import PagerView from "react-native-pager-view";
import * as Progress from "react-native-progress";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import EncryptedStorage from "react-native-encrypted-storage";
import { useDispatch, useSelector } from "react-redux";
import types from "../../redux/types";

import Header from "../../components/Header/Header";
import Wizard1 from "../../components/Wizards/Wizard1";
import Wizard2 from "../../components/Wizards/Wizard2";
import Wizard3 from "../../components/Wizards/Wizard3";
import Wizard4 from "../../components/Wizards/Wizard4";
import Wizard5 from "../../components/Wizards/Wizard5";
import Wizard6 from "../../components/Wizards/Wizard6";
import Wizard7 from "../../components/Wizards/Wizard7";
import Wizard8 from "../../components/Wizards/Wizard8";
import Wizard9 from "../../components/Wizards/Wizard9";
import Wizard10 from "../../components/Wizards/Wizard10";
import Wizard11 from "../../components/Wizards/Wizard11";
import Wizard12 from "../../components/Wizards/Wizard12";
import { Props } from "../../../@types";
import Colors from "../../common/Colors";
import ReviewOffer from "../../components/ReviewOffer/ReviewOffer";
import AcceptFinance from "../../components/AcceptFinance/AcceptFinance";
import PersonalDetails from "../../components/Kyc/PersonalDetails";
import IdVerification from "../../components/Kyc/IdVerification";
import { useGetWizard } from "../../utils/graphql/wizard/wizard.query";
import Signature from "../../components/Kyc/Signature/Signature";
import Thankyou from "../../components/Kyc/Thankyou/Thankyou";
import Loading from "../Loader/Loading";
import ErrorHandle from "../../components/ErrorHandle/ErrorHandle";
import styles from "./styles";

const ProgressScreens: React.FC<Props> = ({ navigation, state, route }) => {
  const dispatch = useDispatch();
  const { financeApplication } = useSelector((state) => state.financeApplicationReducer);

  const { Veriff = false } = route.params;
  const pageRef = useRef<any>();
  const [wizardsFields, setWizardsField] = useState({
    data: [],
    loading: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [percentage, setPercentage] = useState<number>(0.1);
  const [progress, setProgress] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [accountLink, setAccountLink] = useState<boolean>(false);
  const [useremail, setUserEmail] = useState<string>('')
  const windowWidth = Dimensions.get("window").width;
  const [fetchData] = useGetWizard("wizard1");

  const changePage = (pageIndex: number) => {
    if (pageIndex) {
      pageRef.current.setPage(pageIndex);
      setPercentage(!Veriff ? (pageIndex + 1) / 18 : (pageIndex + 1) / 5);
      pageTitle(pageIndex);
    }
  };

  const prevPage = () => {
    if (pageIndex) {
      pageRef.current.setPage(pageIndex - 1);
      setPercentage(!Veriff ? (pageIndex + 1) / 18 : (pageIndex + 1) / 5);
      pageTitle(pageIndex);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const profileData = await EncryptedStorage.getItem('@user_profile')
        setUserEmail(JSON.parse(profileData)?.email)
        const { data, loading } = await fetchData();
        setWizardsField({
          data: data.wizards.data[0].attributes.Form.Screen,
          loading: loading,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const pageTitle = (pageIndex: number) => {
    if (pageIndex >= 1 && pageIndex < 12 && !Veriff) {
      return `${pageIndex ? pageIndex : 1} of 11`;
    }
    if (pageIndex === 12) {
      return "Review Offers";
    }
    if (pageIndex === 13) {
      return "Accept Finance";
    }
    if (pageIndex === 0 || (pageIndex === 0 && Veriff)) {
      return "Personal Details";
    }
    if (pageIndex === 14 || (pageIndex === 1 && Veriff)) {
      return "Identity Verification";
    }
    if (pageIndex === 15 || (pageIndex === 2 && Veriff)) {
      return "Personal Details";
    }
    if (pageIndex === 16 || (pageIndex === 3 && Veriff)) {
      return "Signature";
    }
  };

  const handleSubmit = async (e: boolean) => {
    if (e) {
      try {
        setLoading(true);
        setProgress(1);
        await dispatch({
          type: types.FINANCE_APPLICATION,
          payload: 1,
        });
        setLoading(false);
        // linkPlaidAccount();
      } catch (error) {
        console.log("Error pordt", error);
        ErrorHandle(error);
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          pageIndex == 0
            ? Colors.kycBackground
            : Colors.appBackground,
      }}
    >
      {loading && (
        <View style={styles.loaderContainer}>
          <Loading
            progress
            percentage={progress}
            msg="Checking your details..."
          />
        </View>
      )}
      {accountLink && (
        <View style={styles.loaderContainer}>
          <Loading />
        </View>
      )}
      <Animatable.View animation="fadeIn" duration={500} style={{ flex: 1 }}>
        <StatusBar
          hidden={false}
          barStyle="dark-content"
          backgroundColor={pageIndex == 0
            ? Colors.kycBackground
            : Colors.appBackground}
        />
        <View style={{ paddingTop: 30, paddingHorizontal: 30 }}>
          <Header
            title={pageTitle(pageIndex)}
            navigation={navigation}
            wizards={pageIndex === 0 ? false : true}
            onPress={prevPage}
          />
          <View style={{ alignSelf: "center", marginVertical: 15 }}>
            <Progress.Bar
              borderColor="#ffffff"
              unfilledColor="#ffffff"
              progress={percentage}
              width={windowWidth - 60}
              color={Colors.progressBarColor}
            />
          </View>
        </View>

        {/* {!Veriff ? ( */}
        <PagerView
          ref={pageRef}
          scrollEnabled={false}
          onPageSelected={({ nativeEvent }) =>
            setPageIndex(nativeEvent.position)
          }
          style={{ flex: 1 }}
          initialPage={0}
        >
          <View key={1}>
            <PersonalDetails pageIndex={pageIndex} changePage={changePage} />
          </View>
          <View key={2}>
            <Wizard2
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[1]}
              loading={wizardsFields.loading}
            />
          </View>
          <View key={3}>
            <Wizard3
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[2]}
              loading={wizardsFields.loading}
            />
          </View>
          <View key={4}>
            <Wizard4
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[3]}
              loading={wizardsFields.loading}
            />
          </View>
          <View key={5}>
            <Wizard5
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[4]}
            />
          </View>
          <View key={6}>
            <Wizard6
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[5]}
              loading={wizardsFields.loading}
            />
          </View>
          <View key={7}>
            <Wizard7
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[6]}
              loading={wizardsFields.loading}
            />
          </View>
          <View key={8}>
            <Wizard8
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[7]}
              loading={wizardsFields.loading}
            />
          </View>
          <View key={9}>
            <Wizard9
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[8]}
              loading={wizardsFields.loading}
            />
          </View>
          <View key={10}>
            <Wizard10
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[9]}
              loading={wizardsFields.loading}
            />
          </View>
          <View key={11}>
            <Wizard11
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[10]}
              loading={wizardsFields.loading}
            />
          </View>
          <View key={12}>
            <Wizard12
              pageIndex={pageIndex}
              changePage={changePage}
              data={wizardsFields.data[11]}
              loading={wizardsFields.loading}
              submit={handleSubmit}
            />
          </View>
          <View key={13}>
            <ReviewOffer pageIndex={pageIndex} changePage={changePage} />
          </View>
          <View key={14}>
            <AcceptFinance pageIndex={pageIndex} changePage={changePage} />
          </View>
          <View key={15}>
            <IdVerification
              navigation={navigation}
              pageIndex={pageIndex}
              changePage={changePage}
            />
          </View>
          <View key={16}>
            <Thankyou
              navigation={navigation}
              pageIndex={pageIndex}
              changePage={changePage}
            />
          </View>
          <View key={17}>
            <Signature
              navigation={navigation}
              pageIndex={pageIndex}
              changePage={changePage}
            />
          </View>
        </PagerView>
      </Animatable.View>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(ProgressScreens);

function mapStateToProps(state: any) {
  const { wizardsFormReducer } = state;
  const filteredArray = wizardsFormReducer.wizardsFormData.filter(
    (e: { name: string }) => e.name !== ""
  );
  const newArray = [];
  for (let i of filteredArray) {
    const obj = {
      [i.name]: i.value,
    };
    newArray.push(obj);
  }

  const d = newArray.reduce(function (result, current) {
    return Object.assign(result, current);
  }, {});

  return { state: d };
}
