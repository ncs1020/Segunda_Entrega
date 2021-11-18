import { createDrawerNavigator } from '@react-navigation/drawer';

const {Home} = require("./Home");
const {Validador} = require("./Validador");

const Drawer = createDrawerNavigator();


function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Validador" component={Validador} />
    </Drawer.Navigator>
  );
}