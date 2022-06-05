module.exports = function reee(d) {
    d.command.add('emote', (arg, arg2) => {
        if (arg == 'delay') {
            d.settings.delay = arg2 * 1
            d.command.message(`sit delay set to ${arg2}`)
        }
        if (arg == 'idle') {
            d.settings.idles = !d.settings.idles
            d.command.message(`idle animations ${d.settings.idles ? 'shown' : 'blocked'}`)
        }
    })

    d.hook('C_SOCIAL', '*', (e) => {
        if ([38, 39].includes(e.emote)) setTimeout(() => { cSocial(e) }, d.settings.delay)
        else cSocial(e)
    })

    d.hook('S_SOCIAL', '*', (e) => {
        if (!d.game.me.is(e.target)) return
        if (d.settings.idles && [31, 32, 33].includes(e.animation)) return
        return false
    })

    function cSocial(e) { d.send('S_SOCIAL', '*', { target: d.game.me.gameId, animation: e.emote }) }
}
