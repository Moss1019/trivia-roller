
const pattern = /&([a-z0-9#]*);/g

const replacements = {
    'amp': '&',
    'quot': '"',
    '#039': '\'',
    'aacute': 'á'
};

function escapeHtml(html) {
    let iteration = 0;
    while(iteration < 20) {
        const parts = pattern.exec(html);
        if(!parts) {
            return html;
        }
        html = html.replaceAll(parts[0], replacements[parts[1]]);
        ++iteration;
    }
}

export default escapeHtml;
