const fs          = require('fs');
const googleFonts = require('./index');

// console.log(googleFonts);

let tmpl = `<?php
return array(
`;

for (let googleFont in googleFonts) {

    tmpl += `
  '${googleFont}' => array(
       'label'    => '${googleFont}',
       'category' => '${googleFonts[googleFont].category}',
       'subsets'  => array(
`;

    for (let subset in googleFonts[googleFont].subsets) {
        tmpl += `           '${subset}'  => '${googleFonts[googleFont].subsets[subset]}',
`;
    }
    tmpl += `       ),`;
    // End of subset array

    tmpl += `
       'variants'  => array(
`;

    for (let variant in googleFonts[googleFont].variants) {
        tmpl += `           '${variant}'  =>  '${googleFonts[googleFont].variants[variant]}',
`;
    }

    tmpl += `       ),`;
    // End of variant array

    tmpl += `
  ),
`;
    // End font array
}

tmpl += `
);`;

fs.writeFile('google-fonts.php', tmpl, function () {
    console.log('Google Fonts PHP Generated.');
});