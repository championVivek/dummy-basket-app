import React, { useState } from 'react'
import { Text, View } from 'react-native';
import Header from '../../components/Header/Header';
import commonStyles from '../../common/styles';
import Button from '../../components/Button/Button';
import { Dropdown } from 'react-native-element-dropdown';

const AgreementUpdate = ({navigation}) => {
  const[value,setValue] = useState<string>();
  const agreementTerms=[
    {
        label:'12 months',
        value:'12'
    },
    {
        label:'24 months',
        value:'24'
    },
    {
        label:'36 months',
        value:'36'
    },
    {
        label:'48 months',
        value:'48'
    }
  ]
  return (
    <View>
        <Header
            title='Agreement Term'
            navigation={navigation}
        />
        <View style={{ paddingHorizontal: 30 }}>
            <Text style={commonStyles.title}>
              How long would you like?
            </Text>
            <Text style={commonStyles.selectOneText}>
              Select to change aggrement term
            </Text>
        </View>
        <Dropdown
            data={agreementTerms}
            labelField='label'
            valueField='value'
            value={value}
            onChange={(item)=>setValue(item.value)}
        />
        <Button
            onPress={()=>console.log('update aggrement term')}
            title='Update'
        />
    </View>
  )
}

export default AgreementUpdate