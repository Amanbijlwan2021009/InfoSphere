<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
// import { SocketContextProvider } from "./context/SocketContext.jsx";

const styles = {
	global: (props) => ({
		body: {
			color: mode("gray.800", "whiteAlpha.900")(props),
			bg: mode("gray.100", "#101010")(props),
		},
	}),
};

const config = {
	initialColorMode: "dark",
	useSystemColorMode: true,
};

const colors = {
	gray: {
		light: "#616161",
		dark: "#1e1e1e",
	},
};

const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById("root")).render(
	// React.StrictMode renders every component twice (in the initial render), only in development.
	<React.StrictMode>
		<RecoilRoot>
			<BrowserRouter>
				<ChakraProvider theme={theme}>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					{/* <SocketContextProvider> */}
					{/* </SocketContextProvider> */}
						<App />
				</ChakraProvider>
			</BrowserRouter>
		</RecoilRoot>
	</React.StrictMode>
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.jsx";
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from "recoil"
// import theme from './theme'
//import  {UserHeader}  from "./components/UserHeader.jsx";


const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props),
    }
  })
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e"
  }
};

const theme = extendTheme({ config, styles, colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  //React.StrictMode renders every component twice , on development
  //on production it performs normal
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />

          <App />
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
>>>>>>> 0d00deef4c1f037fa075847f988ac901c685e54f
);
