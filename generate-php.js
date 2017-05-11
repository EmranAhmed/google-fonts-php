const fs          = require('fs');
const googleFonts = require('./index');

// console.log(googleFonts);

let tmpl = `<?php

\/\/ Generate Google Fonts PHP Array
\/\/ Generated from https://github.com/EmranAhmed/google-fonts-php

return array(
`;

for (let googleFont in googleFonts) {

    tmpl += `
  '${googleFont}' => array(
       'id'       => '${googleFont}',
       'name'     => "${googleFonts[googleFont].name}",
       'label'    => "${googleFonts[googleFont].label}",
       'family'   => "${googleFonts[googleFont].family}",
       'category' => "${googleFonts[googleFont].category}",
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



/**
    tmpl += `
       'locals'  => array(
`;

    for (let local in googleFonts[googleFont].locals) {
        tmpl += `           '${local}'  =>  "${googleFonts[googleFont].locals[local]}",
`;
    }

    tmpl += `       ),`;
    // End of local array
*/


    tmpl += `
  ),
`;
    // End font array
}

tmpl += `
);`;

fs.writeFile('google-fonts.php', tmpl, function () {
    console.log('');
    console.log('🎉  Generated on file "google-fonts.php".');
    console.log('');
});