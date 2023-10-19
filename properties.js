define(['./About', './utils'], function (About, Util) {
    const {
        exportDataToClipboard,
        importDataFromClipboard,
        sheets,
        isWebLink,
        isSheetLink,
    } = Util;

    About(); // Initialize About panel

    const pageSettings = {
        type: 'items',
        component: 'expandable-items',
        label: 'Page Settings',
        translation: 'Page Settings',
        ref: 'pageSettings',
        grouped: true,
        items: {
            titleSettings: {
                type: 'items',
                label: 'Title settings',
                translation: 'Title settings',
                items: {
                    isHeaderEnabled: {
                        ref: 'pageSettings.isHeaderEnabled',
                        type: 'boolean',
                        component: 'switch',
                        label: 'Enable header',
                        defaultValue: true,
                        options: [
                            { label: 'Enabled', value: true },
                            { label: 'Disabled', value: false },
                        ],
                    },
                    pageTitle: {
                        type: 'string',
                        ref: 'pageSettings.pageTitle',
                        label: 'Title',
                        defaultValue: 'Title',
                        expression: 'optional',
                    },
                    pageTitleBackgroundColor: {
                        ref: 'pageSettings.pageTitleBackgroundColor',
                        label: 'Title Background Color',
                        component: 'color-picker',
                        type: 'object',
                        defaultValue: {
                            color: '#004A7C',
                        },
                        show: function (layout) {
                            return !layout.pageSettings
                                .isExpressionPageTitleBackgroundColor;
                        },
                    },
                    pageTitleBackgroundColorExpression: {
                        ref: 'pageSettings.pageTitleBackgroundColorExpression',
                        label: 'Title Background Color',
                        type: 'string',
                        expression: 'optional',
                        show: function (layout) {
                            return layout.pageSettings
                                .isExpressionPageTitleBackgroundColor;
                        },
                    },
                    isExpressionPageTitleBackgroundColor: {
                        ref: 'pageSettings.isExpressionPageTitleBackgroundColor',
                        type: 'boolean',
                        component: 'switch',
                        label: 'Use expression',
                        defaultValue: false,
                        options: [
                            { label: 'Enabled', value: true },
                            { label: 'Disabled', value: false },
                        ],
                    },
                    pageTitleTextColor: {
                        ref: 'pageSettings.pageTitleTextColor',
                        label: 'Title Text Color',
                        component: 'color-picker',
                        type: 'object',
                        defaultValue: {
                            color: '#FFFFFF',
                        },
                        show: function (layout) {
                            return !layout.pageSettings
                                .isExpressionPageTitleTextColor;
                        },
                    },
                    pageTitleTextColorExpression: {
                        ref: 'pageSettings.pageTitleTextColorExpression',
                        label: 'Title Text Color',
                        type: 'string',
                        expression: 'optional',
                        show: function (layout) {
                            return layout.pageSettings
                                .isExpressionPageTitleTextColor;
                        },
                    },
                    isExpressionPageTitleTextColor: {
                        ref: 'pageSettings.isExpressionPageTitleTextColor',
                        type: 'boolean',
                        component: 'switch',
                        label: 'Use expression',
                        defaultValue: false,
                        options: [
                            { label: 'Enabled', value: true },
                            { label: 'Disabled', value: false },
                        ],
                    },
                },
            },

            backgroundSettings: {
                type: 'items',
                label: 'Background settings',
                translation: 'Background settings',
                items: {
                    pageBackgroundColor: {
                        ref: 'pageSettings.pageBackgroundColor',
                        label: 'Background Color',
                        component: 'color-picker',
                        type: 'object',
                        defaultValue: {
                            color: '#FFFFFF',
                        },
                        show: function (layout) {
                            return !layout.pageSettings
                                .isExpressionPageBackgroundColor;
                        },
                    },
                    pageBackgroundColorExpression: {
                        ref: 'pageSettings.pageBackgroundColorExpression',
                        label: 'Background Color',
                        type: 'string',
                        expression: 'optional',
                        show: function (layout) {
                            return layout.pageSettings
                                .isExpressionPageBackgroundColor;
                        },
                    },
                    isExpressionPageBackgroundColor: {
                        ref: 'pageSettings.isExpressionPageBackgroundColor',
                        type: 'boolean',
                        component: 'switch',
                        label: 'Use expression',
                        defaultValue: false,
                        options: [
                            { label: 'Enabled', value: true },
                            { label: 'Disabled', value: false },
                        ],
                    },
                },
            },

            cardSettings: {
                type: 'items',
                label: 'Card settings',
                translation: 'Card settings',
                items: {
                    customCardDimensions: {
                        ref: 'pageSettings.customCardDimensions',
                        type: 'boolean',
                        component: 'switch',
                        label: 'Enable custom dimension definition.',
                        defaultValue: false,
                        options: [
                            { label: 'Enabled', value: true },
                            { label: 'Disabled', value: false },
                        ],
                    },
                    cardHeight: {
                        show: function (layout) {
                            return (
                                !!layout.pageSettings.customCardDimensions &&
                                !layout.pageSettings.isExpressionCardDimensions
                            );
                        },
                        ref: 'pageSettings.cardHeight',
                        component: 'slider',
                        type: 'integer',
                        label: 'Define the height (px) for all cards',
                        defaultValue: 442,
                        min: 0,
                        max: 1000,
                        step: 1,
                    },
                    cardWidth: {
                        show: function (layout) {
                            return (
                                !!layout.pageSettings.customCardDimensions &&
                                !layout.pageSettings.isExpressionCardDimensions
                            );
                        },
                        ref: 'pageSettings.cardWidth',
                        component: 'slider',
                        type: 'integer',
                        label: 'Define the width (px) for all cards',
                        defaultValue: 300,
                        min: 0,
                        max: 1000,
                        step: 1,
                    },
                    cardHeightExpression: {
                        show: function (layout) {
                            return (
                                !!layout.pageSettings.customCardDimensions &&
                                layout.pageSettings.isExpressionCardDimensions
                            );
                        },
                        ref: 'pageSettings.cardHeightExpression',
                        type: 'integer',
                        label: 'Define the height (px) for all cards',
                        defaultValue: 442,
                        expression: 'optional',
                    },
                    cardWidthExpression: {
                        show: function (layout) {
                            return (
                                !!layout.pageSettings.customCardDimensions &&
                                layout.pageSettings.isExpressionCardDimensions
                            );
                        },
                        ref: 'pageSettings.cardWidthExpression',
                        type: 'integer',
                        label: 'Define the width (px) for all cards',
                        defaultValue: 300,
                        expression: 'optional',
                    },
                    isExpressionCardDimensions: {
                        ref: 'pageSettings.isExpressionCardDimensions',
                        type: 'boolean',
                        component: 'switch',
                        label: 'Use expression',
                        defaultValue: false,
                        options: [
                            { label: 'Enabled', value: true },
                            { label: 'Disabled', value: false },
                        ],
                    },
                },
            },

            logoSettings: {
                type: 'items',
                label: 'Logo settings (top left)',
                translation: 'Logo settings (top left)',
                items: {
                    logoImage: {
                        type: 'string',
                        label: 'Logo Image (top left of banner)',
                        component: 'media',
                        ref: 'pageSettings.logoMedia',
                        layoutRef: 'pageSettings.logoMedia',
                    },
                    logoLink: {
                        ref: 'pageSettings.logoLink',
                        label: 'Logo Link (when clicking logo)',
                        type: 'string',
                        expression: 'optional',
                    },
                },
            },

            fontSettings: {
                type: 'items',
                label: 'Font setings',
                translation: 'Font settings',
                items: {
                    enabledCustomFontSizes: {
                        ref: 'pageSettings.enabledCustomFontSizes',
                        type: 'boolean',
                        component: 'switch',
                        label: 'Custom font sizes',
                        defaultValue: false,
                        options: [
                            { label: 'Enabled', value: true },
                            { label: 'Disabled', value: false },
                        ],
                    },

                    bannerFontSize: {
                        ref: 'pageSettings.fonts.banner.fontSize',
                        type: 'string',
                        label: 'Banner font size (px/rem)',
                        defaultValue: null,
                        expression: 'optional',
                        show: function (layout) {
                            return layout.pageSettings.enabledCustomFontSizes;
                        },
                    },

                    cardTitleFontSize: {
                        ref: 'pageSettings.fonts.card.front.title.fontSize',
                        type: 'string',
                        label: 'Card title font size (px/rem)',
                        defaultValue: null,
                        expression: 'optional',
                        show: function (layout) {
                            return layout.pageSettings.enabledCustomFontSizes;
                        },
                    },

                    cardSubTitleFontSize: {
                        ref: 'pageSettings.fonts.card.front.subtitle.fontSize',
                        type: 'string',
                        label: 'Card subtitle font size (px/rem)',
                        defaultValue: null,
                        expression: 'optional',
                        show: function (layout) {
                            return layout.pageSettings.enabledCustomFontSizes;
                        },
                    },

                    cardBackTitleFontSize: {
                        ref: 'pageSettings.fonts.card.back.title.fontSize',
                        type: 'string',
                        label: 'Card back title font size (px/rem)',
                        defaultValue: null,
                        expression: 'optional',
                        show: function (layout) {
                            return layout.pageSettings.enabledCustomFontSizes;
                        },
                    },

                    cardBackTextFontSize: {
                        ref: 'pageSettings.fonts.card.back.text.fontSize',
                        type: 'string',
                        label: 'Card back text font size (px/rem)',
                        defaultValue: null,
                        expression: 'optional',
                        show: function (layout) {
                            return layout.pageSettings.enabledCustomFontSizes;
                        },
                    },
                },
            },

            classificationSettings: {
                type: 'items',
                label: 'NIPR/SIPR',
                translation: 'NIPR/SIPR',
                items: {
                    sectionTitle: {
                        label: 'If this landing page is on SIPR toggle this option to ensure links work properly.',
                        component: 'text',
                    },
                    isSipr: {
                        type: 'boolean',
                        component: 'radiobuttons',
                        label: 'NIPR/SIPR',
                        defaultValue: false,
                        ref: 'pageSettings.isSipr',
                        options: [
                            { value: false, label: 'NIPR' },
                            { value: true, label: 'SIPR' },
                        ],
                    },
                },
            },

            dataSection: {
                type: 'items',
                label: 'Import/Export data',
                translation: 'Import/Export data',
                items: {
                    copyDataButton: {
                        component: 'button',
                        label: 'Copy Data to Clipboard',
                        ref: 'pageSettings.copyDataButton',
                        action: exportDataToClipboard,
                    },
                    importDataButton: {
                        component: 'button',
                        label: 'Import Data from Clipboard',
                        ref: 'pageSettings.importDataButton',
                        action: importDataFromClipboard,
                    },
                },
            },
        },
    };

    const menuItems = {
        type: 'array',
        translation: 'Cards',
        ref: 'menuItems',
        min: 1,
        allowAdd: true,
        allowRemove: true,
        allowMove: true,
        addTranslation: 'Add Card',
        grouped: true,
        itemTitleRef: 'cardTitle',
        items: {
            cardSettings: {
                type: 'items',
                component: 'expandable-items',
                grouped: true,
                items: {
                    settings: {
                        label: 'Settings',
                        translation: 'Settings',
                        type: 'items',
                        items: {
                            isHidden: {
                                ref: 'isHidden',
                                type: 'boolean',
                                component: 'switch',
                                label: 'Hide card',
                                defaultValue: false,
                                options: [
                                    {
                                        label: 'Hidden',
                                        value: true,
                                    },
                                    {
                                        label: 'Visible',
                                        value: false,
                                    },
                                ],
                            },
                        },
                    },
                    cardFaceSettings: {
                        label: 'Card Face',
                        translation: 'Card Face',
                        type: 'items',
                        items: {
                            cardTitle: {
                                type: 'string',
                                ref: 'cardTitle',
                                label: 'Card Title',
                            },
                            cardSubtitle: {
                                type: 'string',
                                ref: 'cardSubtitle',
                                label: 'Card Subtitle',
                            },
                            coverImageUrl: {
                                type: 'string',
                                ref: 'coverImageUrl',
                                label: 'Cover Image URL (File name)',
                                expression: 'optional',
                            },
                            coverImageMedia: {
                                type: 'string',
                                label: 'Or choose from library: ',
                                component: 'media',
                                ref: 'coverImageMedia',
                                layoutRef: 'coverImageMedia',
                            },
                            isFlippable: {
                                type: 'boolean',
                                ref: 'isFlippable',
                                label: 'Card flip',
                                component: 'switch',
                                defaultValue: true,
                                options: [
                                    {
                                        label: 'Enabled',
                                        value: true,
                                    },
                                    {
                                        label: 'Disabled',
                                        value: false,
                                    },
                                ],
                            },
                            cardClass: {
                                type: 'string',
                                label: 'HTML class (applied to markup)',
                                ref: 'cardClass',
                            },
                        },
                    },

                    cardBackSettings: {
                        label: 'Card Back',
                        translation: 'Card Back',
                        type: 'items',
                        items: {
                            cardBackTitle: {
                                type: 'string',
                                ref: 'cardBackTitle',
                                label: 'Title (back of card)',
                            },
                            cardDescription: {
                                type: 'string',
                                component: 'textarea',
                                label: 'Description (back of card)',
                                rows: 10,
                                ref: 'cardDescription',
                            },
                            cardVisitButtonText: {
                                type: 'string',
                                ref: 'cardVisitButtonText',
                                label: 'Text for the link on back of card',
                            },
                            cardIsVisitButtonEnabled: {
                                type: 'boolean',
                                component: 'switch',
                                label: "'VISIT' button",
                                ref: 'cardIsVisitButtonEnabled',
                                defaultValue: true,
                                options: [
                                    {
                                        label: 'Enabled',
                                        value: true,
                                    },
                                    {
                                        label: 'Disabled',
                                        value: false,
                                    },
                                ],
                            },
                        },
                    },

                    linkSettings: {
                        label: 'Card Link',
                        translation: 'Card Link',
                        type: 'items',
                        items: {
                            menuItemType: {
                                type: 'string',
                                component: 'dropdown',
                                ref: 'linkType',
                                label: 'Link Type',
                                options: [
                                    {
                                        label: 'Sheet Link',
                                        value: 'sheet-link',
                                    },
                                    {
                                        label: 'Website URL',
                                        value: 'web-link',
                                    },
                                    {
                                        label: 'None',
                                        value: 'no-link',
                                    },
                                ],
                            },
                            href: {
                                type: 'string',
                                ref: 'href',
                                label: 'URL',
                                show: isWebLink,
                            },
                            sheetId: {
                                type: 'string',
                                component: 'dropdown',
                                ref: 'sheetId',
                                label: 'Sheet',
                                defaultValue: 0,
                                options: sheets,
                                show: isSheetLink,
                            },
                            clickToFollowLink: {
                                type: 'boolean',
                                ref: 'clickToFollowLink',
                                label: 'Click anywhere to open link',
                                component: 'switch',
                                defaultValue: true,
                                options: [
                                    {
                                        label: 'Enabled',
                                        value: true,
                                    },
                                    {
                                        label: 'Disabled',
                                        value: false,
                                    },
                                ],
                            },
                        },
                    },

                    ribbonSettings: {
                        label: 'Ribbon',
                        translation: 'Ribbon',
                        type: 'items',
                        items: {
                            isComingSoon: {
                                type: 'boolean',
                                component: 'switch',
                                ref: 'isComingSoon',
                                label: 'Enable ribbon:',
                                defaultValue: false,
                                options: [
                                    { label: 'Enabled', value: true },
                                    { label: 'Disabled', value: false },
                                ],
                            },
                            ribbonLabel: {
                                type: 'string',
                                ref: 'ribbonLabel',
                                label: 'Ribbon Label',
                                defaultValue: 'IN DEVELOPMENT',
                            },
                            ribbonColor: {
                                type: 'string',
                                component: 'dropdown',
                                ref: 'ribbonColor',
                                label: 'Ribbon Color',
                                defaultValue: 'ribbon-blue',
                                options: [
                                    { label: 'Blue', value: 'ribbon-blue' },
                                    { label: 'Red', value: 'ribbon-red' },
                                    { label: 'Gray', value: 'ribbon-grey' },
                                ],
                            },
                        },
                    },

                    styleSettings: {
                        label: 'Styles (CSS)',
                        translation: 'Styles (CSS)',
                        type: 'items',
                        items: {
                            cardFrontStyles: {
                                type: 'string',
                                component: 'textarea',
                                label: 'Custom CSS (Front of Card)',
                                rows: 10,
                                ref: 'cardFrontStyles',
                            },
                            cardBackStyles: {
                                type: 'string',
                                component: 'textarea',
                                label: 'Custom CSS (Back of card)',
                                rows: 10,
                                ref: 'cardBackStyles',
                            },
                            customCss: {
                                type: 'string',
                                component: 'textarea',
                                label: 'Custom CSS (Applied to page)',
                                rows: 10,
                                ref: 'customCss',
                            },
                        },
                    },
                },
            },
        },
    };

    const aboutSection = {
        type: 'items',
        translation: 'About',
        items: {
            about: {
                component: 'About',
                translation: 'About',
            },
        },
    };

    return {
        type: 'items',
        component: 'accordion',
        items: {
            pageSettings,
            menuItems,
            aboutSection,
        },
    };
});
