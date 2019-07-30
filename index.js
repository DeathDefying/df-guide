
const thirdBossActions =
{
    1213: {msg: 'Circle - Iframe'},
    1214: {msg: 'Circle - Iframe'},
    1215: {msg: 'Circle - Iframe'},
    1216: {msg: 'Circle - Iframe'}, // seems like every circle done the next one will be previousId+1, not sure about this tho
    1218: {msg: 'Pushback - Iframe'},
    1205: {msg: 'Pushback - Iframe'},
    1212: {msg: 'Out to in Wave'} 
}

const thirdBoss = 46704;

module.exports = function DemokronFactoryGuide(mod)
{
    let hooks = [],
    enabled = true;

    mod.command.add(['df'],(arg) => {
        if(arg && arg.length > 0) arg = arg.toLowerCase();
        enabled = !enabled;
        mod.command.message(`Demokron Factory Guide ${enabled ? 'Enabled' : 'Disabled'}`);
        if(!enabled) unload_guide();
    });
    
        mod.hook('S_LOAD_TOPO',3,(event) => {
        if(event.zone === 9067 && enabled)
        {
            mod.command.message('Welcome to Demokron Factory - Hard Mode');
            load_guide();
        }
        else
        {
            unload_guide();
        }
    });
    
    function load_guide()
    {
        if(!hooks.length)
        {
            hook('S_ACTION_STAGE',9,(event) => {
                if(!enabled) return;
                let skill = event.skill.id;
                switch(event.templateId)
                {   
                    case thirdBoss:      
                        if(thirdBossActions[skill])
                        {   
                            sendMessage(thirdBossActions[skill].msg);
                        }
                    break;
                    default: // do nothing
                        break;
                }
            });
        }
 
    }

    function sendMessage(msg)
    {
            mod.send('S_CHAT',1,{
            channel: 21, 
            authorName: 'Guide',
            message: msg
        });
    }

    function unload_guide() 
    {
		if(hooks.length) {
			for(let h of hooks) mod.unhook(h)

			hooks = []
		}
	}

    function hook() 
    {
		hooks.push(mod.hook(...arguments))
	}
}