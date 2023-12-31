define(['jquery', './utils'], function ($, Util) {
    const {
        appId,
        isSheetLink,
        isNotLink,
        getHref,
        getBackgroundImageUrl,
        getObjectContentId,
        getObjectTitleId,
        makeClassFromTitle,
        navigateToSheet,
        navigateToUrlInNewTab,
    } = Util;

    return function render(layout) {
        function qualifySelector(selector) {
            // Use this when making jQuery selections
            // so other qlik objects are not targeted
            const contentId = `#${getObjectContentId(layout)}`; // Prepend to every query

            return `${contentId} ${selector}`;
        }

        const pageTitle = layout.pageSettings.pageTitle;
        const isSipr = layout.pageSettings.isSipr;

        // Background color
        const pageBackgroundColor =
            layout.pageSettings.pageBackgroundColor.color;
        const pageBackgroundColorExpression =
            layout.pageSettings.pageBackgroundColorExpression;
        const isExpressionPageBackgroundColor =
            layout.pageSettings.isExpressionPageBackgroundColor;

        // Title background color
        const isHeaderEnabled = layout.pageSettings.isHeaderEnabled !== false;
        const pageTitleBackgroundColor =
            layout.pageSettings.pageTitleBackgroundColor.color;
        const pageTitleBackgroundColorExpression =
            layout.pageSettings.pageTitleBackgroundColorExpression;
        const isExpressionPageTitleBackgroundColor =
            layout.pageSettings.isExpressionPageTitleBackgroundColor;

        // Title text color
        const pageTitleTextColor = layout.pageSettings.pageTitleTextColor.color;
        const pageTitleTextColorExpression =
            layout.pageSettings.pageTitleTextColorExpression;
        const isExpressionPageTitleTextColor =
            layout.pageSettings.isExpressionPageTitleTextColor;

        // Card settings
        const customCardDimensions = layout.pageSettings.customCardDimensions;
        const enabledCustomFontSizes =
            layout.pageSettings.enabledCustomFontSizes;
        const fonts = layout.pageSettings.fonts;

        // Logo
        const logoUrl = layout.pageSettings.logoMedia;
        const logoLink = layout.pageSettings.logoLink;

        $(`header#${getObjectTitleId(layout)}`).css('display', 'none'); // Remove title (The default qlik one that leaves ugly white space at the top)

        // Header settings

        $(qualifySelector('.pacom-page-title')).text(pageTitle); // Set page title if it has changed

        if (isHeaderEnabled) {
            $(qualifySelector('.pacom-header')).css('display', '');
        } else {
            $(qualifySelector('.pacom-header')).css('display', 'none');
        }

        // Set background color
        if (isExpressionPageBackgroundColor && pageBackgroundColorExpression) {
            $(qualifySelector('.pacom-wrapper')).css(
                'background-color',
                pageBackgroundColorExpression
            );
        } else if (pageBackgroundColor) {
            $(qualifySelector('.pacom-wrapper')).css(
                'background-color',
                pageBackgroundColor
            );
        }

        // Set top left logo image
        if (logoUrl) {
            $(qualifySelector('.pacom-logo')).attr('src', logoUrl);
        } else {
            $(qualifySelector('.pacom-logo')).removeAttr('src');
        }

        // Set logo link if not empty or null
        $(qualifySelector('.pacom-logo')).off(); // Clear event handlers

        if (logoLink) {
            $(qualifySelector('.pacom-logo')).click(function () {
                navigateToUrlInNewTab(logoLink);
            });
        }

        // Set the header bg color
        if (
            isExpressionPageTitleBackgroundColor &&
            pageTitleBackgroundColorExpression
        ) {
            $(qualifySelector('.pacom-page-title')).css(
                'background-color',
                pageTitleBackgroundColorExpression
            );
        } else if (pageTitleBackgroundColor) {
            $(qualifySelector('.pacom-page-title')).css(
                'background-color',
                pageTitleBackgroundColor
            );
        }

        // Set header text color
        if (isExpressionPageTitleTextColor && pageTitleTextColorExpression) {
            $(qualifySelector('.pacom-page-title')).css(
                'color',
                pageTitleTextColorExpression
            );
        } else if (pageTitleTextColor) {
            $(qualifySelector('.pacom-page-title')).css(
                'color',
                pageTitleTextColor
            );
        }

        // Change settings of each card
        if (customCardDimensions) {
            const {
                cardHeight,
                cardWidth,
                cardHeightExpression,
                cardWidthExpression,
                isExpressionCardDimensions,
            } = layout.pageSettings;

            const height = isExpressionCardDimensions
                ? cardHeightExpression
                : cardHeight;
            const width = isExpressionCardDimensions
                ? cardWidthExpression
                : cardWidth;

            // Disable min-width and aspect-ratio for the cards
            $(qualifySelector('.col')).css('min-width', 'auto');
            $(qualifySelector('.col')).css('aspect-ratio', 'auto');

            if (!Number.isNaN(height)) {
                $(qualifySelector('.front')).css('min-height', `${height}px`);
                $(qualifySelector('.back')).css('min-height', `${height}px`);
            }

            if (!Number.isNaN(width)) {
                $(qualifySelector('.front')).css('width', `${width}px`);
                $(qualifySelector('.back')).css('width', `${width}px`);
            }
        }

        // Change font sizes
        if (enabledCustomFontSizes) {
            const bannerFontSize = fonts?.banner?.fontSize;
            const cardTitleFontSize = fonts?.card?.front?.title?.fontSize;
            const cardSubtitleFontSize = fonts?.card?.front?.subtitle?.fontSize;
            const cardBackTitleFontSize = fonts?.card?.back?.title?.fontSize;
            const cardBackTextFontSize = fonts?.card?.back?.text?.fontSize;

            if (bannerFontSize) {
                $(qualifySelector('.pacom-page-title')).css(
                    'font-size',
                    bannerFontSize
                );
            }
            if (cardTitleFontSize) {
                $(qualifySelector('.front .inner p')).css(
                    'font-size',
                    cardTitleFontSize
                );
            }
            if (cardSubtitleFontSize) {
                $(qualifySelector('.front .inner span')).css(
                    'font-size',
                    cardSubtitleFontSize
                );
            }
            if (cardBackTitleFontSize) {
                $(qualifySelector('.card-back-title')).css(
                    'font-size',
                    cardBackTitleFontSize
                );
            }
            if (cardBackTextFontSize) {
                $(qualifySelector('.back .inner p')).css(
                    'font-size',
                    cardBackTextFontSize
                );
            }
        } else {
            [
                '.pacom-page-title',
                '.front .inner p',
                '.front .inner span',
                '.card-back-title',
                '.back .inner p',
            ].forEach((selector) => {
                $(qualifySelector(selector)).css('font-size', '');
            });
        }

        for (const menuItem of layout.menuItems) {
            $('<style>').html(menuItem.customCss).appendTo('head');

            const cardClass =
                menuItem.cardClass || makeClassFromTitle(menuItem);

            if (cardClass) {
                /* Apply custom background image */
                if (menuItem.coverImageUrl) {
                    $(qualifySelector(`.${cardClass} > .front`)).css(
                        'background-image',
                        getBackgroundImageUrl({ menuItem })
                    );
                }

                if (menuItem.coverImageMedia) {
                    $(qualifySelector(`.${cardClass} > .front`)).css(
                        'background-image',
                        `url(${menuItem.coverImageMedia})`
                    );
                }

                if (menuItem.isFlippable) {
                    $(qualifySelector(`.container.${cardClass}`)).off(); // Unassign any event handlers
                    /* Toggle hover class for cards on hover */
                    $(qualifySelector(`.container.${cardClass}`)).hover(
                        function () {
                            $(this).toggleClass('hover');
                        }
                    );
                    /* Make it so when you click on a card it stays flipped */
                    $(qualifySelector(`.container.${cardClass}`)).click(
                        function () {
                            $(this).toggleClass('keep-hovered');
                        }
                    );
                }

                if (
                    menuItem.clickToFollowLink &&
                    !isNotLink(menuItem) &&
                    (menuItem.href || menuItem.sheetId)
                ) {
                    /* Determine the onClick callback */
                    let handler;
                    if (menuItem.sheetId && isSheetLink(menuItem)) {
                        handler = function () {
                            navigateToSheet(menuItem.sheetId);
                        };
                    } else {
                        handler = function () {
                            navigateToUrlInNewTab(
                                getHref({
                                    menuItem,
                                    isSipr,
                                })
                            );
                        };
                    }

                    /* Assign onClick event handler */
                    $(qualifySelector(`.${cardClass}`))
                        .parent()
                        .off();
                    $(qualifySelector(`.${cardClass}`))
                        .parent()
                        .click(handler);
                } else if (
                    !isNotLink(menuItem) &&
                    (menuItem.href || menuItem.sheetId)
                ) {
                    if (menuItem.sheetId && isSheetLink(menuItem)) {
                        $(qualifySelector(`.${cardClass} > .back > a`)).click(
                            function () {
                                navigateToSheet(menuItem.sheetId);
                            }
                        );
                    } else {
                        $(qualifySelector(`.${cardClass} > .back > a`)).attr(
                            'href',
                            getHref({
                                menuItem,
                                isSipr,
                            })
                        );
                    }
                } else {
                    // No link for this card
                }

                /* Make font smaller if too much text */
                if (menuItem.isComingSoon) {
                    if (
                        menuItem.ribbonLabel &&
                        menuItem.ribbonLabel.length >= 14
                    ) {
                        if (
                            !$(
                                qualifySelector(
                                    `.${cardClass} .coming-soon-ribbon`
                                )
                            ).hasClass('font-smaller')
                        ) {
                            /* Too many nested ifs, but necessary because double renders may toggle this on then off again.*/
                            $(
                                qualifySelector(
                                    `.${cardClass} .coming-soon-ribbon`
                                )
                            ).toggleClass('font-smaller');
                        }
                    }
                }
            }

            /* Apply custom front/back styles */
            if (menuItem.cardFrontStyles) {
                const cardFrontEl = $(
                    qualifySelector(`.${cardClass} > .front`)
                );
                cardFrontEl.attr(
                    'style',
                    cardFrontEl.attr('style') + ';' + menuItem.cardFrontStyles
                );
            }

            if (menuItem.cardBackStyles) {
                const cardBackEl = $(qualifySelector(`.${cardClass} > .back`));
                cardBackEl.attr(
                    'style',
                    cardBackEl.attr('style') + ';' + menuItem.cardBackStyles
                );
            }
        }

        /* Apply easter egg */
        if (!$(qualifySelector('.easter-egg')).length) {
            $(qualifySelector('.jloc > .back')).append(
                $(
                    `<div 
                  class="easter-egg"
                  style="
                  height:100%;
                  width:100%; 
                  position: absolute;
                  background-image: url('/appcontent/${appId}/kobe.jpg');"></div>`
                )
            );

            $(qualifySelector('.jloc > .back')).on('keyup', function (event) {
                if (event.keyCode === 56) {
                    $('.easter-egg').css('top', 0);
                    $('.easter-egg').css('opacity', 1);
                }
            });
        }
        /********************/
    };
});
