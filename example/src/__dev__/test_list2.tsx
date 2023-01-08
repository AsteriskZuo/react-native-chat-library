import type { EqualHeightListRef } from 'packages/react-native-chat-uikit/src/components/EqualHeightList';
import * as React from 'react';
import {
  AppRegistry,
  RefreshControlProps,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Button,
  EqualHeightList,
  ItemComponent,
  ItemData,
  LocalIcon,
  SearchBar,
} from 'react-native-chat-uikit';
import { RefreshControl } from 'react-native-gesture-handler';

type ItemDataType = ItemData & {
  en: string;
  ch: string;
};

const Item: ItemComponent = (props) => {
  const item = props.data as ItemDataType;
  return (
    <View style={styles.item}>
      <Text>{item.en}</Text>
      <Text>{item.ch}</Text>
    </View>
  );
};

const CustomRefreshComponent = (props: RefreshControlProps) => {
  const { refreshing } = props;
  return (
    <RefreshControl
      refreshing={refreshing}
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'red',
          marginTop: 50,
        }}
      />
    </RefreshControl>
  );
};

export default function TestList2() {
  let count = 0;
  const ref = React.useRef<EqualHeightListRef>(null);
  const enableRefresh = true;
  const enableAlphabet = true;
  const enableHeader = true;
  const useCustomRefresh = false;
  const enableCancel = false;
  const enableClear = true;
  const data: ItemDataType[] = [];
  const r = COUNTRY.map((value) => {
    const i = value.lastIndexOf(' ');
    const en = value.slice(0, i);
    const ch = value.slice(i + 1);
    return {
      key: en,
      en: en,
      ch: ch,
    } as ItemDataType;
  });
  data.push(...r);

  const s = {
    type: (props: RefreshControlProps) => {
      const { onRefresh, refreshing, progressViewOffset, ...others } = props;
      console.log('test:', onRefresh, progressViewOffset);
      return (
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#f9c2ff',
            opacity: refreshing ? 0 : 1,
          }}
          {...others}
        >
          <LocalIcon name="loading" size={20} />
        </View>
      );
    },
    props: {
      refreshing: true,
      progressViewOffset: 100,
    },
    key: 'CustomRefreshComponent',
  };

  const s3 = {
    // Component: {
    //   type: (props: RefreshControlProps) => {
    //     const { onRefresh, refreshing, progressViewOffset, ...others } =
    //       props;
    //     console.log('test:', onRefresh, progressViewOffset);
    //     return (
    //       <View
    //         style={{
    //           height: 30,
    //           width: 30,
    //           backgroundColor: '#f9c2ff',
    //           opacity: refreshing ? 0 : 1,
    //         }}
    //         {...others}
    //       >
    //         <LocalIcon name="loading" size={20} />
    //       </View>
    //     );
    //   },
    //   props: {
    //     refreshing: true,
    //     progressViewOffset: 100,
    //   },
    //   key: 'CustomRefreshComponent',
    // },
    Component: <CustomRefreshComponent refreshing />,
    props: {
      refreshing: true,
    },
  };

  AppRegistry.registerComponent(s.key, () => s.type);
  console.log('test:AppRegistry:', AppRegistry.getAppKeys());

  // const s2 = {
  //   Component: (props: any) => (
  //     <View {...props}>
  //       <Text>h</Text>
  //     </View>
  //   ),
  //   props: {
  //     backgroundColor: 'red',
  //   },
  // };

  const s4 = {
    Component: (props: any) => (
      <View {...props}>
        <SearchBar enableCancel={enableCancel} enableClear={enableClear} />
      </View>
    ),
    props: {
      backgroundColor: 'red',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          const en = 'aaa';
          const v = en + count++;
          ref.current?.manualRefresh([
            {
              type: 'add',
              data: [
                {
                  en: v,
                  ch: v,
                  key: v,
                } as ItemData,
              ],
              enableSort: true,
            },
          ]);
        }}
      >
        sort add data
      </Button>
      <Button
        onPress={() => {
          const en = 'eee';
          const v = en + count++;
          ref.current?.manualRefresh([
            {
              type: 'add',
              data: [
                {
                  en: v,
                  ch: v,
                  key: v,
                } as ItemData,
              ],
              enableSort: false,
            },
          ]);
        }}
      >
        add data
      </Button>
      <Button
        onPress={() => {
          ref.current?.manualRefresh([
            {
              type: 'clear',
            },
          ]);
        }}
      >
        clear data
      </Button>
      <Button
        onPress={() => {
          const en = 'Angola';
          const v = en + count++;
          ref.current?.manualRefresh([
            {
              type: 'update',
              data: [
                {
                  en: en,
                  ch: v,
                  key: en,
                } as ItemData,
              ],
              enableSort: false,
            },
          ]);
        }}
      >
        update data
      </Button>
      <EqualHeightList
        ref={ref}
        items={data}
        ItemFC={Item}
        enableAlphabet={enableAlphabet}
        enableRefresh={enableRefresh}
        enableHeader={enableHeader}
        alphabet={{
          alphabetCurrent: {
            backgroundColor: 'orange',
            color: 'white',
          },
        }}
        RefreshComponent={useCustomRefresh ? s3 : undefined}
        HeaderComponent={enableHeader === true ? s4 : undefined}
        onRefresh={(type) => {
          if (type === 'started') {
            const en = 'aaa';
            const v = en + count++;
            ref.current?.manualRefresh([
              {
                type: 'add',
                data: [
                  {
                    en: v,
                    ch: v,
                    key: v,
                  } as ItemData,
                ],
                enableSort: true,
              },
            ]);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    // backgroundColor: 'red',
  },
  item: {
    flex: 1,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 80,
  },
});
const COUNTRY = [
  'Angola 安哥拉',
  'Afghanistan 阿富汗',
  'Albania 阿尔巴尼亚',
  'Algeria 阿尔及利亚',
  'Andorra 安道尔共和国',
  'Anguilla 安圭拉岛',
  'Antigua and Barbuda 安提瓜和巴布达',
  'Argentina 阿根廷',
  'Armenia 亚美尼亚',
  'Ascension 阿森松',
  'Australia 澳大利亚',
  'Austria 奥地利',
  'Azerbaijan 阿塞拜疆',
  'Bahamas 巴哈马',
  'Bahrain 巴林',
  'Bangladesh 孟加拉国',
  'Barbados 巴巴多斯',
  'Belarus 白俄罗斯',
  'Belgium 比利时',
  'Belize 伯利兹',
  'Benin 贝宁',
  'Bermuda Is. 百慕大群岛',
  'Bolivia 玻利维亚',
  'Botswana 博茨瓦纳',
  'Brazil 巴西',
  'Brunei 文莱',
  'Bulgaria 保加利亚',
  'Burkina-faso 布基纳法索',
  'Burma 缅甸',
  'Burundi 布隆迪',
  'Cameroon 喀麦隆',
  'Canada 加拿大',
  'Cayman Is. 开曼群岛',
  'Central African Republic 中非共和国',
  'Chad 乍得',
  'Chile 智利',
  'China 中国',
  'Colombia 哥伦比亚',
  'Congo 刚果',
  'Cook Is. 库克群岛',
  'Costa Rica 哥斯达黎加',
  'Cuba 古巴',
  'Cyprus 塞浦路斯',
  'Czech Republic 捷克',
  'Denmark 丹麦',
  'Djibouti 吉布提',
  'Dominica Rep. 多米尼加共和国',
  'Ecuador 厄瓜多尔',
  'Egypt 埃及',
  'EI Salvador 萨尔瓦多',
  'Estonia 爱沙尼亚',
  'Ethiopia 埃塞俄比亚',
  'Fiji 斐济',
  'Finland 芬兰',
  'France 法国',
  'French Guiana 法属圭亚那',
  'Gabon 加蓬',
  'Gambia 冈比亚',
  'Georgia 格鲁吉亚',
  'Germany 德国',
  'Ghana 加纳',
  'Gibraltar 直布罗陀',
  'Greece 希腊',
  'Grenada 格林纳达',
  'Guam 关岛',
  'Guatemala 危地马拉',
  'Guinea 几内亚',
  'Guyana 圭亚那',
  'Haiti 海地',
  'Honduras 洪都拉斯',
  'Hongkong 香港',
  'Hungary 匈牙利',
  'Iceland 冰岛',
  'India 印度',
  'Indonesia 印度尼西亚',
  'Iran 伊朗',
  'Iraq 伊拉克',
  'Ireland 爱尔兰',
  'Israel 以色列',
  'Italy 意大利',
  'Ivory Coast 科特迪瓦',
  'Jamaica 牙买加',
  'Japan 日本',
  'Jordan 约旦',
  'Kampuchea (Cambodia ) 柬埔寨',
  'Kazakstan 哈萨克斯坦',
  'Kenya 肯尼亚',
  'Korea 韩国',
  'Kuwait 科威特',
  'Kyrgyzstan 吉尔吉斯坦',
  'Laos 老挝',
  'Latvia 拉脱维亚',
  'Lebanon 黎巴嫩',
  'Lesotho 莱索托',
  'Liberia 利比里亚',
  'Libya 利比亚',
  'Liechtenstein 列支敦士登',
  'Lithuania 立陶宛',
  'Luxembourg 卢森堡',
  'Macao 澳门',
  'Madagascar 马达加斯加',
  'Malawi 马拉维',
  'Malaysia 马来西亚',
  'Maldives 马尔代夫',
  'Mali 马里',
  'Malta 马耳他',
  'Mariana Is 马里亚那群岛',
  'Martinique 马提尼克',
  'Mauritius 毛里求斯',
  'Mexico 墨西哥',
  'Moldova, Republic of 摩尔多瓦',
  'Monaco 摩纳哥',
  'Mongolia 蒙古',
  'Montserrat Is 蒙特塞拉特岛',
  'Morocco 摩洛哥',
  'Mozambique 莫桑比克',
  'Namibia 纳米比亚',
  'Nauru 瑙鲁',
  'Nepal 尼泊尔',
  'Netheriands Antilles 荷属安的列斯',
  'Netherlands 荷兰',
  'New Zealand 新西兰',
  'Nicaragua 尼加拉瓜',
  'Niger 尼日尔',
  'Nigeria 尼日利亚',
  'North Korea 朝鲜',
  'Norway 挪威',
  'Oman 阿曼',
  'Pakistan 巴基斯坦',
  'Panama 巴拿马',
  'Papua New Cuinea 巴布亚新几内亚',
  'Paraguay 巴拉圭',
  'Peru 秘鲁',
  'Philippines 菲律宾',
  'Poland 波兰',
  'French Polynesia 法属玻利尼西亚',
  'Portugal 葡萄牙',
  'Puerto Rico 波多黎各',
  'Qatar 卡塔尔',
  'Reunion 留尼旺',
  'Romania 罗马尼亚',
  'Russia 俄罗斯',
  'Saint Lueia 圣卢西亚',
  'Saint Vincent 圣文森特岛',
  'Samoa Eastern 东萨摩亚(美)',
  'Samoa Western 西萨摩亚',
  'San Marino 圣马力诺',
  'Sao Tome and Principe 圣多美和普林西比',
  'Saudi Arabia 沙特阿拉伯',
  'Senegal 塞内加尔',
  'Seychelles 塞舌尔',
  'Sierra Leone 塞拉利昂',
  'Singapore 新加坡',
  'Slovakia 斯洛伐克',
  'Slovenia 斯洛文尼亚',
  'Solomon Is 所罗门群岛',
  'Somali 索马里',
  'South Africa 南非',
  'Spain 西班牙',
  'Sri Lanka 斯里兰卡',
  'St.Lucia 圣卢西亚',
  'St.Vincent 圣文森特',
  'Sudan 苏丹',
  'Suriname 苏里南',
  'Swaziland 斯威士兰',
  'Sweden 瑞典',
  'Switzerland 瑞士',
  'Syria 叙利亚',
  'Taiwan 台湾省',
  'Tajikstan 塔吉克斯坦',
  'Tanzania 坦桑尼亚',
  'Thailand 泰国',
  'Togo 多哥',
  'Tonga 汤加',
  'Trinidad and Tobago 特立尼达和多巴哥',
  'Tunisia 突尼斯',
  'Turkey 土耳其',
  'Turkmenistan 土库曼斯坦',
  'Uganda 乌干达',
  'Ukraine 乌克兰',
  'United Arab Emirates 阿拉伯联合酋长国',
  'United Kiongdom 英国',
  'United States of America 美国',
  'Uruguay 乌拉圭',
  'Uzbekistan 乌兹别克斯坦',
  'Venezuela 委内瑞拉',
  'Vietnam 越南',
  'Yemen 也门',
  'Yugoslavia 南斯拉夫',
  'Zimbabwe 津巴布韦',
  'Zaire 扎伊尔',
  'Zambia 赞比亚',
];
