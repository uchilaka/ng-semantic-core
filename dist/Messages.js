angular.module('mod.messages', [])
        .factory('$messageFactory', [
            '$sce',
            function $messageFactoryProvider($sce) {
                console.log('[module.messageFactory]');
                return {
                    create: function (text, title, className) {
                        var titleText = (title ? title : 'Message'),
                                m = {
                                    id: (new Date()).getTime(),
                                    title: $sce.trustAsHtml(titleText),
                                    html: $sce.trustAsHtml(text),
                                    className: (className ? className : 'info')
                                };
                        console.log('New message ->', m);
                        return m;
                    }
                };
            }])
        .component('messageListView', {
            template: '<div ng-show="Messages.length > 0" class="ui vertical segment" \
     ng-show="Messages.length">\
    <div ng-repeat="Msg in Messages" class="ui {{Msg.className}} message" style="margin-left: auto; margin-right: auto;">\
        <i class="close icon" ng-click="deleteMessage(Msg)">&nbsp;</i>\
        <div class="header" ng-bind-html="Msg.title"></div>\
        <p ng-bind-html="Msg.html"></p>\
    </div>\
</div>\
',
            controller: function MessageListCtrl($scope, $rootScope) {
                
                $scope.$watch('Messages', function(nw,ol) {
                    if(nw) {
                        console.log('Updating root scope...');
                        $rootScope.Messages = $scope.Messages;
                    }
                });
                
                $scope.Messages = $rootScope.Messages;
                $rootScope.$watch('Messages', function(nw,ol) {
                    $scope.Messages = $rootScope.Messages;
                });
                
                $scope.deleteMessage = function (m) {
                    console.log('Deleting message ->', m);
                    angular.forEach($scope.Messages, function (msg, at) {
                        if (angular.equals(msg.id, m.id)) {
                            $scope.Messages.splice(at, 1);
                            return;
                        }
                    });
                };
            }
        });