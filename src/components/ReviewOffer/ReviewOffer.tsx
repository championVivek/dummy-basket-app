import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ProgressProps } from "../../../@types";
import commonStyles from "../../common/styles";
import types from "../../redux/types";
import GradientCard from "../GradientCard/GradientCard";
import OfferCard from "../OfferCard";

const ReviewOffer: React.FC<ProgressProps> = ({ pageIndex, changePage }) => {
  const { financeApplication } = useSelector((state) => state.financeApplicationReducer);
  const [lenders, setLenders] = useState([]);
  const dispatch = useDispatch();
  const nextPage = (data) => {
    dispatch({
      type: types.LENDERS_DETAILS,
      payload: data,
    });
    
    if (pageIndex) changePage(pageIndex + 1);
  };


  return (
    <>
      <FlatList
        data={lenders}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ marginTop: 10 }}
        ListHeaderComponent={() => (
          <View style={{ paddingHorizontal: 30 }}>
            <Text style={commonStyles.title}>These are the best available lenders</Text>
            <Text style={commonStyles.selectOneText}>APR based on your credit rating.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 20 }}>
            <GradientCard offerTitle={"Best Monthly Price"}>
              <OfferCard onPress={nextPage} btnTitle="Review Offer" data={item} />
            </GradientCard>
          </View>
        )}
      />
    </>
  );
};

export default ReviewOffer;
