function MostVisitedController($scope) {
    chrome.extension.sendMessage({purpose:"get"}, function (response) {
        var sites = response.sites;

        sites.map(function(site) {
            site.faviconURL = site.url.split('/')[2];
        });

        $scope.sites = sites;
        $scope.$apply();
    });

    $scope.changed = function(item) {
        alert(item);
    }
}
