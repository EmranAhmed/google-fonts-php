const googleFonts = require('./google-fonts.json');

const variantInfo = {
    '100'  : 'Thin 100',
    '100i' : 'Thin 100 Italic',
    '200'  : 'Extra light 200',
    '200i' : 'Extra light 200 Italic',
    '300'  : 'Light 300',
    '300i' : 'Light 300 Italic',
    '400'  : 'Regular 400',
    '400i' : 'Regular 400 Italic',
    '500'  : 'Medium 500',
    '500i' : 'Medium 400 Italic',
    '600'  : 'Semi bold 600',
    '600i' : 'Semi bold 600 Italic',
    '700'  : 'Bold 700',
    '700i' : 'Bold 700 Italic',
    '800'  : 'Extra bold 800',
    '800i' : 'Extra bold 800 Italic',
    '900'  : 'Black 900',
    '900i' : 'Black 900 Italic'
};

const subsetInfo = {
    'sinhala'      : 'Sinhala',
    'cyrillic'     : 'Cyrillic',
    'cyrillic-ext' : 'Cyrillic Extended',
    'devanagari'   : 'Devanagari',
    'greek'        : 'Greek',
    'greek-ext'    : 'Greek Extended',
    'khmer'        : 'Khmer',
    'latin'        : 'Latin',
    'latin-ext'    : 'Latin Extended',
    'vietnamese'   : 'Vietnamese',
    'hebrew'       : 'Hebrew',
    'arabic'       : 'Arabic',
    'bengali'      : 'Bengali',
    'gujarati'     : 'Gujarati',
    'tamil'        : 'Tamil',
    'telugu'       : 'Telugu',
    'thai'         : 'Thai',
};

module.exports = Object.keys(googleFonts).reduce((generatedObject, font) => {

    let fontObject   = googleFonts[font];
    let fontVariants = fontObject.variants;

    let generateSubsets = fontObject.subsets.reduce((generatedSubsetObject, subset)=> {
        generatedSubsetObject[subset] = subsetInfo[subset];
        return generatedSubsetObject;
    }, {});

    let generateVariants = Object.keys(fontVariants).reduce((generatedVariantObject, variant)=> {
        Object.keys(fontVariants[variant]).map(number=> {
            return variant == 'italic' ? `${number}i` : number; // [100, 100i, 200, 200i]
        }).map(variantNumber => {
            generatedVariantObject[variantNumber] = variantInfo[variantNumber];
        });

        return generatedVariantObject;
    }, {});

    // {400i: "'ABeeZee-Italic', sans-serif"}

    let generateLocals = Object.keys(fontVariants).reduce((generatedLocalObject, variant)=> {
        
        Object.keys(fontVariants[variant]).map(number=> {
            
            let variantNumber = variant == 'italic' ? `${number}i` : number; // [100, 100i, 200, 200i]

            generatedLocalObject[variantNumber] = `${fontVariants[variant][number]['local'].pop()}, ${fontObject.category}`;

        });

        return generatedLocalObject;
    }, {});



    let id     = font.replace(/\s+/g, '-').toLowerCase();
    let type   = (['serif', 'sans-serif'].includes(fontObject.category)) ? `, ${fontObject.category}` : '';
    let label  = (/\s/g.test(font))  ? `"${font}", ${fontObject.category}` : `${font}, ${fontObject.category}`;
    let family = (/\s/g.test(font))  ? `"${font}"${type}` : `${font}${type}`;

    generatedObject[id] = {
        label    : label.trim(),
        family   : family.trim(),
        category : fontObject.category,
        subsets  : generateSubsets,
        variants : generateVariants,
        locals   : generateLocals
    };

    return generatedObject;
}, {});
