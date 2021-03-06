const run = require('./_run');

it('variable template', () => {
    const input = `.foo {
        border: 2px solid #000;
    }`;
    const output = `:root {
        --theme-black-1: #000;\n}\n.foo {
        border: 2px solid var(--theme-black-1);
    }`;
    return run(input, output, { onlyColor: true, templateVariableName: 'theme[colorKeyword]' });
});

it('variable template with two black colors', () => {
    const input = `.foo {
        border: 2px solid #000;
        color: #020202;
    }`;
    const output = `:root {
        --theme-black-1: #000;
        --theme-black-2: #020202;\n}\n.foo {
        border: 2px solid var(--theme-black-1);
        color: var(--theme-black-2);
    }`;
    return run(input, output, { onlyColor: true, templateVariableName: 'theme[colorKeyword]' });
});

it('variable template with light and dark color', () => {
    const input = `.foo {
        border: 2px solid #cc0000;
        color: #ff0000;
        background-color: rgb(255, 26, 26);
    }`;
    const output = `:root {
        --theme-dark-red-1: #cc0000;
        --theme-red-1: #ff0000;
        --theme-light-red-1: rgb(255, 26, 26);\n}\n.foo {
        border: 2px solid var(--theme-dark-red-1);
        color: var(--theme-red-1);
        background-color: var(--theme-light-red-1);
    }`;
    return run(input, output, {
        onlyColor: true,
        templateVariableName: 'theme[tint][colorKeyword]',
    });
});

it('variable template with tint', () => {
    const input = `.foo {
        border: 2px solid #000;
        color: #020202;
        background-color: #0d0d0d;
    }`;
    const output = `:root {
        --black-1: #000;
        --black-light-1: #020202;
        --black-light-2: #0d0d0d;\n}\n.foo {
        border: 2px solid var(--black-1);
        color: var(--black-light-1);
        background-color: var(--black-light-2);
    }`;
    return run(input, output, { onlyColor: true, templateVariableName: '[colorKeyword][tint]' });
});

it('variable template without special word at the end', () => {
    const input = `.foo {
        border: 2px solid #000;
        color: #020202;
        background-color: #0d0d0d;
    }`;
    const output = `:root {
        --black-new-1: #000;
        --light-black-new-1: #020202;
        --light-black-new-2: #0d0d0d;\n}\n.foo {
        border: 2px solid var(--black-new-1);
        color: var(--light-black-new-1);
        background-color: var(--light-black-new-2);
    }`;
    return run(input, output, {
        onlyColor: true,
        templateVariableName: '[tint][colorKeyword]new',
    });
});

it('template with propertyName', () => {
    const input = `.foo {
        border: 1px solid #000;
        background-color: red;
    }`;
    const output = `:root {
        --theme-border-1: 1px solid #000;
        --theme-background-color-1: red;\n}\n.foo {
        border: var(--theme-border-1);
        background-color: var(--theme-background-color-1);
    }`;
    return run(input, output, {
        templateVariableName: 'theme[propertyName]',
    });
});

it('variable template with selector', () => {
    const input = `.foo {
        border: 2px solid #000;
        color: red;
    }`;
    const output = `:root {
        --theme-foo-1: #000;
        --theme-foo-2: red;\n}\n.foo {
        border: 2px solid var(--theme-foo-1);
        color: var(--theme-foo-2);
    }`;
    return run(input, output, { onlyColor: true, templateVariableName: 'theme[selectorName]' });
});

it('variable template with tint and selector', () => {
    const input = `.foo.bar {
        border: 2px solid #000;
        color: #020202;
        background-color: #0d0d0d;
    }`;
    const output = `:root {
        --foo-bar-black-1: #000;
        --foo-bar-black-light-1: #020202;
        --foo-bar-black-light-2: #0d0d0d;\n}\n.foo.bar {
        border: 2px solid var(--foo-bar-black-1);
        color: var(--foo-bar-black-light-1);
        background-color: var(--foo-bar-black-light-2);
    }`;
    return run(input, output, {
        onlyColor: true,
        templateVariableName: '[selectorName][colorKeyword][tint]',
    });
});
