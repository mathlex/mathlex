(function() {
    var unwrap = (ast, recursive=false, rules={Parentheses: 1}) => {
        var i;
        if (i = rules[ast[0]]) {
            return recursive ? unwrap(ast[i]) : ast[i]
        } else {
            return ast
        }
    }

    var LEFT = `left`
    var RIGHT = `right`

    var implicitMultiplication = (ast, immediateDir) => {
        var node;
        node = unwrap(ast, true, {
            Times: immediateDir == LEFT ? 2 : 1,
            Modulus: immediateDir == LEFT ? 2 : 1,
            Vectorizer: 1,
            Factorial: 1,
            Prime: 1,
            Exponent: 1,
            Superscript: 1,
            Subscript: 1
        })
        return [`Divide`, `Parentheses`, `AbsVal`, `Vector`, `Vectorizer`, `Variable`, `Constant`, `Function`].includes(node[0])
    }
    var render = (ast) => {
        var o;
        switch (ast[0]) {

            case `Empty`: o=`{\\Box}`; break;
            case `Iff`: `${render(ast[1])} \\leftrightarrow ${render(ast[2])}`; break;
            case `Implies`: o=`${render(ast[ast[3] ? 2 : 1])} \\${ast[3] ? `left` : `right`}arrow ${render(ast[ast[3] ? 1 : 2])}`; break;

            case `And`: o=`${render(ast[1])} \\wedge ${render(ast[2])}}`; break;
            case `Xor`: o=`${render(ast[1])} \\veebar ${render(ast[2])}`; break;
            case `Or`: o=`${render(ast[1])} \\vee ${render(ast[2])}`; break;
            case `Not`: o=`\\neg ${render(ast[1])}`; break;

            case `Forall`: o=`\\forall ${render(ast[1])} \\; ${render(ast[2])}`; break;
            case `Exists`: o=`\\exists ${render(ast[1])} \\; ${render(ast[2])}`; break;
            case `Unique`: o=`\\exists ! ${render(ast[1])} \\; ${render(ast[2])}`; break;

            case `Equivalent`: o=`${render(ast[1])} \\equiv ${render(ast[2])}`; break;
            case `NotEquivalent`: o=`${render(ast[1])} \\not\\equiv ${render(ast[2])}`; break;

            case `Less`: o=`${render(ast[1])} < ${render(ast[2])}`; break;
            case `LessEqual`: o=`${render(ast[1])} \\le ${render(ast[2])}`; break;
            case `Equal`: o=`${render(ast[1])} = ${render(ast[2])}`; break;
            case `NotEqual`: o=`${render(ast[1])} \\ne ${render(ast[2])}`; break;
            case `RatioEqual`: o=`${render(ast[1])} :: ${render(ast[2])}`; break;
            case `Congruent`: o=`${render(ast[1])} \\cong ${render(ast[2])}`; break;
            case `Similar`: o=`${render(ast[1])} \\sim ${render(ast[2])}`; break;
            case `Parallel`: o=`${render(ast[1])} \\parallel ${render(ast[2])}`; break;
            case `Perpendicular`: o=`${render(ast[1])} \\perp ${render(ast[2])}`; break;
            case `GreaterEqual`: o=`${render(ast[1])} \\ge ${render(ast[2])}`; break;
            case `Greater`: o=`${render(ast[1])} > ${render(ast[2])}`; break;
            case `Subset`: o=`${render(ast[1])} \\subseteq ${render(ast[2])}`; break;
            case `Superset`: o=`${render(ast[1])} \\supseteq ${render(ast[2])}`; break;
            case `ProperSubset`: o=`${render(ast[1])} \\subset ${render(ast[2])}`; break;
            case `ProperSuperset`: o=`${render(ast[1])} \\supset ${render(ast[2])}`; break;
            case `Inclusion`: o=`${render(ast[1])} \\in ${render(ast[2])}`; break;
            case `Divides`: o=`${render(ast[1])} \\mid ${render(ast[2])}`; break;
            case `NotDivides`: o=`${render(ast[1])} \\nmid ${render(ast[2])}`; break;

            case `Plus`: o=`${render(ast[1])} + ${render(ast[2])}`; break;
            case `Minus`: o=`${render(ast[1])} - ${render(ast[2])}`; break;
            case `PlusMinus`: o=`${render(ast[1])} \\pm ${render(ast[2])}`; break;
            case `MinusPlus`: o=`${render(ast[1])} \\mp ${render(ast[2])}`; break;
            case `Times`: o=`${render(ast[1])} ${implicitMultiplication(ast[1], LEFT) || implicitMultiplication(ast[2], RIGHT) ? `` : ` \\cdot`} ${render(ast[2])}`; break;
            case `Divide`: o=`${ast[3] ? `\\dfrac{` : ``}${render(ast[3] ? unwrap(ast[1]) : ast[1])}${ast[3] ? `}{` : ` / `}${render(ast[3] ? unwrap(ast[2]) : ast[2])}${ast[3] ? `}` : ``}`; break;
            case `Ratio`: o=`${render(ast[1])} : ${render(ast[2])}`; break;
            case `Modulus`: o=`${render(ast[1])} \\pmod{${render(ast[2])}}`; break;
            case `Exponent`: o=`${render(ast[1])}^{${render(ast[2])}}`; break;
            case `Superscript`: o=`${render(ast[1])}{}^{${unwrap(ast[2])[0] == `List` ? unwrap(ast[2])[1].map(render).join(` ,\\, `) : render(unwrap(ast[2]))}}`; break;
            case `Superscript`: o=`${render(ast[1])}{}_{${unwrap(ast[2])[0] == `List` ? unwrap(ast[2])[1].map(render).join(` ,\\, `) : render(unwrap(ast[2]))}}`; break;
            case `DotProduct`: o=`${render(ast[1])} \\cdot ${render(ast[2])}`; break;
            case `CrossProduct`: o=`${render(ast[1])} \\times ${render(ast[2])}`; break;
            case `WedgeProduct`: o=`${render(ast[1])} \\wedge ${render(ast[2])}`; break;
            case `TensorProduct`: o=`${render(ast[1])} \\otimes ${render(ast[2])}`; break;
            case `Compose`: o=`${render(ast[1])} \\circ ${render(ast[2])}`; break;
            case `SelfCompose`: o=`${render(ast[1])}^{\\circ ${render(ast[2])}}`; break;
            case `Union`: o=`${render(ast[1])} \\cup ${render(ast[2])}`; break;
            case `Intersection`: o=`${render(ast[1])} \\cap ${render(ast[2])}`; break;
            case `SetDiff`: o=`${render(ast[1])} \\setminus ${render(ast[2])}`; break;
            case `DirectSum`: o=`${render(ast[1])} \\oplus ${render(ast[2])}`; break;
            case `CartesianProduct`: o=`${render(ast[1])} \\times ${render(ast[2])}`; break;

            case `Positive`: o=`+${render(ast[1])}`; break;
            case `Negative`: o=`-${render(ast[1])}`; break;
            case `PosNeg`: o=`\\pm ${render(ast[1])}`; break;
            case `NegPos`: o=`\\mp ${render(ast[1])}`; break;
            case `Partial`: o=`\\partial ${render(ast[1])}`; break;
            case `Differential`: o=`\\mathrm{d} ${render(ast[1])}`; break;
            case `Change`: o=`\\Delta ${render(ast[1])}`; break;
            case `Gradient`: o=`\\vec\\nabla ${render(ast[1])}`; break;
            case `Divergence`: o=`\\vec\\nabla\\cdot ${render(ast[1])}`; break;
            case `Curl`: o=`\\vec\\nabla\\times ${render(ast[1])}`; break;
            case `Vectorizer`: o=`${unwrap(ast[1], true)[0] == `Variable` && nextNode[1].length == 1 ? `\\vec` : `\\overrightarrow`}{${render(unwrap(ast[1], true))}}`; break;
            case `UnitVectorizer`: o=`\\hat{${render(ast[1])}}`; break;
            case `Factorial`: o=`${render(ast[1])}!`; break;
            case `Prime`: o=`${render(ast[1])}`; break;
            case `DotDiff`:
                var depth = 1;
                var node = ast[1];
                var start = ``;
                var end = ``;
                while (node[0] == `DotDiff`) {
                    depth += 1
                    if (depth == 4) {
                        start += `\\ddddot{`
                        end += `}`
                        depth = 0
                    }
                    node = node[1]
                }
                var inside = start + render(node) + end
                switch (depth) {
                    case 0: o=inside; break;
                    case 1: o=`\\dot{${inside}}`; break;
                    case 2: o=`\\ddot{${inside}}`; break;
                    case 3: o=`\\dddot{${inside}}`; break;
                }
            break;
            case `Parentheses`: o=`\\left(${render(ast[1])}\\right)`; break;
            case `AbsVal`: o=`\\left|${render(ast[1])}\\right|`; break;
            case `Norm`: o=`\\left\\|${render(ast[1])}\\right\\|`; break;

            case `Range`: o=`\\left${ast[1] ? `[` : `(`} ${render(ast[2])},\\,${render(ast[3])}\\right${ast[4] ? `]` : `)`}`; break;
            case `Vector`: o=`\\left\\langle ${ast[1].map(render).join(`,\\,`)} \\right\\rangle`; break;
            case `EmptySet`: o=`\\varnothing`; break;
            case `Set`: o=`\\left\\{ ${ast[1].map(render).join(` ,\\, `)} \\right\\}`; break;
            case `List`: o=`\\left[ ${ast[1].map(render).join(` ,\\, `)} \\right]`; break;
            case `SetBuilder`: o=`\\left\\{ ${render(ast[1])} ~:~ ${ast[2].map(render).join(` ,\\, `)} \\right\\}`; break;
            case `Bra`: o=`\\left\\langle ${render(ast[1])} \\right|`; break;
            case `Ket`: o=`\\left| ${render(ast[1])} \\right\\rangle`; break;
            case `BraKet`: o=`\\left\\langle ${render(ast[1])} \\mid ${render(ast[2])} \\right\\rangle`; break;
            case `Integral`:
                var bnd = [ast[3].lo ? `_{${render(unwrap(ast[3].lo))}}` : ``,ast[3].hi ? `^{${render(unwrap(ast[3].lo))}}` : ``].join(``)
                o=`\\int ${bounds ? `\\limits ${bounds}` : ``} ${render(ast[1])} \\, \\mathrm{d}${render(ast[2])}`
            break;
            case `Function`:
                args = ast[2].map(render)
                if (ast[1][0] == `Variable`) {
                    if ([`asin`,`acos`,`atan`,`acsc`,`asec`,`acot`,`asinh`,`acosh`,`atanh`,`acsch`,`asech`,`acoth`].contains(ast[1][1])) {
                        ast[1][1] = `arc` + ast[1][1].substring(1)
                    }
                    if (ast[1][1].match(/^(lim(it)?|int(egral)?|sum|prod(uct)?)$/i)) {
                        ast[1][1] = ast[1][1].toLowerCase()
                    }
                    switch (ast[1][1]) {
                        case `abs`: o=`\\left| ${render(ast[2][0])} \\right|`; break;
                        case `root`: o=`\\sqrt[${render(ast[2][1])}]{${render(ast[2][0])}}`; break;
                        case `ln`: case `sin`: case `cos`: case `tan`: case `csc`: case `sec`: case `cot`: case `arcsin`: case `arccos`: case `arctan`: case `sinh`: case `cosh`: case `tanh`: case `coth`:
                            o=`\\${ast[1][1]}{\\left( ${args} \\right)}`; break;
                        case `sqrt`: o=`\\${ast[1][1]}{${args}}`; break;
                        case `arccsc`: case `arcsec`: case `arccot`: case `arcsinh`: case `arccosh`: case `arctanh`: case `arccsch`: case `arcsech`: case `arccoth`: case `csch`: case `sech`:
                            o=`\\mathrm{${ast[1][1]}}{\\left( ${args} \\right)}`; break;
                        case `int`: case `integral`:
                            var bounds;
                            switch (ast[2].length) {
                                case 4: o=`_{${render(ast[2][2])}}^{${render(ast[2][3])}}`; break;
                                case 3: o=`_{${render(ast[2][2])}}`; break;
                                default: ``
                            }
                            o=`\\int${bounds ? `\\limits ${bounds}` : ``} ${render(ast[2][0])} \\, \\mathrm{d}${render(ast[2][1])}`; break;
                        case `diff`:
                            if ([`Variable`, `Constant`].includes(ast[2][0][0])) {
                                o=`\\frac{\\mathrm{d}${render(ast[2][0])}}{\\mathrm{d}${render(ast[2][1])}}`
                            } else {
                                o=`\\frac{\\mathrm{d}}{\\mathrm{d}${render(ast[2][1])}} \\left( ${render(unwrap(ast[2][0]))} \\right)`
                            }
                        break;
                        case `pdiff`:
                            if ([`Variable`, `Constant`].includes(ast[2][0][0])) {
                                o=`\\frac{\\partial ${render(ast[2][0])}}{\\partial ${render(ast[2][1])}}`
                            } else {
                                o=`\\frac{\\partial}{\\partial ${render(ast[2][1])}} \\left( ${render(unwrap(ast[2][0]))} \\right)`
                            }; break;
                        case `grad`: case `div`: case `curl`:
                            o=`\\mathrm{${ast[1][1]}}{\\left( ${args} \\right)}`; break;
                        case `log`:
                            base = ast[2].length == 2 ? `_{${render(ast[2][1])}}` : ``
                            o=`\\log${base}{\\left( ${render(ast[2][0])} \\right)}`; break;
                        case `exp`:
                            o=`\\exp{\\left( ${render(ast[2][0])} \\right)}`; break;
                        case `lim`: case `limit`: o=`\\lim\\limits_{${render(ast[2][1])} \\to ${render(ast[2][2])}} ${render(ast[2][0])}`; break;
                        case `sum`:
                            lowerBound = ast[2].length == 4 ? `${render(ast[2][1])} = ${render(ast[2][2])}` : render(ast[2][1])
                            upperBound = ast[2].length == 4 ? `^{${render(ast[2][3])}}` : ``
                            o=`\\sum\\limits_{${lowerBound}}${upperBound} ${render(ast[2][0])}`; break;
                        case `prod`: case `product`:
                            lowerBound = ast[2].length == 4 ? `${render(ast[2][1])} = ${render(ast[2][2])}` : render(ast[2][1])
                            upperBound = ast[2].length == 4 ? `^{${render(ast[2][3])}}` : ``
                            o=`\\prod\\limits_{${lowerBound}}${upperBound} ${render(ast[2][0])}`; break;
                        case `Union`:
                            lowerBound = ast[2].length == 4 ? `${render(ast[2][1])} = ${render(ast[2][2])}` : render(ast[2][1])
                            upperBound = ast[2].length == 4 ? `^{${render(ast[2][3])}}` : ``
                            o=`\\bigcup\\limits_{${lowerBound}}${upperBound} ${render(ast[2][0])}`; break;
                        case `Intersect`:
                            lowerBound = ast[2].length == 4 ? `${render(ast[2][1])} = ${render(ast[2][2])}` : render(ast[2][1])
                            upperBound = ast[2].length == 4 ? `^{${render(ast[2][3])}}` : ``
                            o=`\\bigcap\\limits_{${lowerBound}}${upperBound} ${render(ast[2][0])}`; break;
                        case `Gamma`: o=`\\Gamma{\\left( ${render(ast[2][0])} \\right)}`; break;
                        case `C`: case `combination`: case `comb`: o=`\\binom{${render(ast[2][0])}}{${render(ast[2][1])}}`; break;
                        case `C`: case `permutation`: case `perm`: o=`P \\left( ${render(ast[2][0])}, ${render(ast[2][1])} \\right)`; break;
                        case `floor`: o=`\\left\\lfloor ${render(ast[2][0])} \\right\\rfloor`; break;
                        case `ceil`: case `ceiling`: o=`\\left\\lceil ${render(ast[2][0])} \\right\\rceil`; break;
                        default: o=`${ast[1][1]} \\left( ${args} \\right)`
                    }
                } else {
                    o=`${render(ast[1])} \\left( ${args.join ` ,\\, `} \\right)`
                }
            break;
            case `Literal`: o=ast[2]; break;
            case `Variable`:
            switch (ast[1]) {
                case `Alpha`: o=`A`; break;
                case `alpha`: o=`\\alpha`; break;
                case `Beta`: o=`B`; break;
                case `beta`: o=`\\beta`; break;
                case `Gamma`: o=`\\Gamma`; break;
                case `gamma`: o=`\\gamma`; break;
                case `Delta`: o=`\\Delta`; break;
                case `delta`: o=`\\delta`; break;
                case `Epsilon`: o=`E`; break;
                case `epsilon`: o=`\\epsilon`; break;
                case `vepsilon`: case `epsilonv`: case `varepsilon`: case `epsilonvar`: o=`\\varepsilon`; break;
                case `Zeta`: o=`Z`; break;
                case `zeta`: o=`\\zeta`; break;
                case `Eta`: o=`H`; break;
                case `eta`: o=`\\eta`; break;
                case `Theta`: o=`\\Theta`; break;
                case `theta`: o=`\\theta`; break;
                case `vtheta`: case `thetav`: case `vartheta`: case `thetavar`: o=`\\vartheta`; break;
                case `Iota`: o=`I`; break;
                case `iota`: o=`\\iota`; break;
                case `Kappa`: o=`K`; break;
                case `kappa`: o=`\\kappa`; break;
                case `Lambda`: o=`\\Lambda`; break;
                case `lambda`: o=`\\lambda`; break;
                case `Mu`: o=`M`; break;
                case `mu`: o=`\\mu`; break;
                case `Nu`: o=`N`; break;
                case `nu`: o=`\\nu`; break;
                case `Xi`: o=`\\Xi`; break;
                case `xi`: o=`\\xi`; break;
                case `Omicron`: o=`O`; break;
                case `omicron`: o=`o`; break;
                case `Pi`: o=`\\Pi`; break;
                case `pi`: o=`\\pi`; break;
                case `vpi`: case `piv`: case `varpi`: case `pivar`: case `pomega`: o=`\\varpi`; break;
                case `Rho`: o=`P`; break;
                case `rho`: o=`\\rho`; break;
                case `vrho`: case `rhov`: case `varrho`: case `rhovar`: o=`\\varrho`; break;
                case `Sigma`: o=`\\Sigma`; break;
                case `sigma`: o=`\\sigma`; break;
                case `vsigma`: case `sigmav`: case `varsigma`: case `sigmavar`: o=`\\varsigma`; break;
                case `Tau`: o=`T`; break;
                case `tau`: o=`\\tau`; break;
                case `Upsilon`: o=`\\Upsilon`; break;
                case `upsilon`: o=`\\upsilon`; break;
                case `Phi`: o=`\\Phi`; break;
                case `phi`: o=`\\phi`; break;
                case `vphi`: case `phiv`: case `varphi`: case `phivar`: o=`\\varphi`; break;
                case `Chi`: o=`X`; break;
                case `chi`: o=`\\chi`; break;
                case `Psi`: o=`\\Psi`; break;
                case `psi`: o=`\\psi`; break;
                case `Omega`: o=`\\Omega`; break;
                case `omega`: o=`\\omega`; break;
                default: o=ast[1]
            }; break;
            case `Constant`:
            switch (ast[1].toLowerCase()) {
                case `t`, `true`: o=`\\mathbf{T}`; break;
                case `f`, `false`: o=`\\mathbf{F}`
                default: switch (ast[1]) {
                    case `tau`: o=`\\tau`; break;
                    case `p`, `pi`: o=`\\pi`; break;
                    case `gamma`: o=`\\gamma`; break;
                    case `e`: o=`\\mathrm{e}`; break;
                    case `infinity`: case `oo`: o=`\\infty`; break;
                    case `O`: o=`\\mathbb{O}`; break;
                    case `H`: o=`\\mathbb{H}`; break;
                    case `C`: o=`\\mathbb{C}`; break;
                    case `R`: o=`\\mathbb{R}`; break;
                    case `Q`: o=`\\mathbb{Q}`; break;
                    case `Z`: o=`\\mathbb{Z}`; break;
                    case `N`: o=`\\mathbb{N}`; break;
                    case `U`: o=`\\mathbb{U}`; break;
                    case `v0`: o=`\\vec{0}`; break;
                    case `vi`: case `ui`: o=`\\hat\\imath`; break;
                    case `vj`: case `uj`: o=`\\hat\\jmath`; break;
                    case `vk`: case `uk`: o=`\\hat{k}`; break;
                    case `0`: o=`\\mathbf{O}`; break;
                    case `1`: o=`\\mathbf{I}`; break;
                    case `I`: o=`I`; break;
                    case `empty`: o=`\\varnothing`; break;
                    default: o=ast[1]
                }
            }; break;
            default: o=` (? ${ast[0]} ?) `
        }
        return o;
    }
    window.latexrender = render
}).call(this)
