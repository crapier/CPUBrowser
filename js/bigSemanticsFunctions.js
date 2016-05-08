var bsService = new BSAutoSwitch(['elkanacmmmdgbnhdjopfdeafchmhecbf', 'gdgmmfgjalcpnakohgcfflgccamjoipd ']);

function getBS(url){
	var options = {};
	var callback = bSCallback;
	bsService.loadMetadata(url, options, callback);
}

function bSCallback(err, metadataAndMetametaData){
	console.log("test");
	var metaData = BSUtils.unwrap(metadataAndMetametaData.metadata);

	try{
		console.log(metaData);
	}catch(e){
		console.log("Error getting BS");
	}
}