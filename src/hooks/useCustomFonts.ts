import { useFonts } from 'expo-font';

export function useCustomFonts() {
    const [fontsLoaded] = useFonts({
        'sf-pro': require('../../assets/fonts/SFPRODISPLAYREGULAR.otf'),
        'sf-pro-bold': require('../../assets/fonts/SFPRODISPLAYBOLD.otf'),
        'sf-pro-black-italic': require('../../assets/fonts/SFPRODISPLAYBLACKITALIC.otf'),
        'sf-pro-heavy-italic': require('../../assets/fonts/SFPRODISPLAYHEAVYITALIC.otf'),
        'sf-pro-light-italic': require('../../assets/fonts/SFPRODISPLAYLIGHTITALIC.otf'),
        'sf-pro-medium': require('../../assets/fonts/SFPRODISPLAYMEDIUM.otf'),
        'sf-pro-thin-italic': require('../../assets/fonts/SFPRODISPLAYTHINITALIC.otf'),
        'sf-pro-ultralight-italic': require('../../assets/fonts/SFPRODISPLAYULTRALIGHTITALIC.otf')
    });

    return fontsLoaded;
}