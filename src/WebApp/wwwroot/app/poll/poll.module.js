"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var poll_list_component_1 = require('./poll-list.component');
var new_poll_component_1 = require('./new-poll.component');
var common_1 = require('@angular/common');
var poll_service_1 = require('./poll.service');
var router_1 = require('@angular/router');
var PollModule = (function () {
    function PollModule() {
    }
    PollModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild([
                    { path: 'polls', component: poll_list_component_1.PollListComponent },
                    { path: 'newpoll', component: new_poll_component_1.NewPollComponent }
                ])],
            declarations: [
                poll_list_component_1.PollListComponent,
                new_poll_component_1.NewPollComponent
            ],
            exports: [
                poll_list_component_1.PollListComponent,
                new_poll_component_1.NewPollComponent
            ],
            providers: [
                poll_service_1.PollService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PollModule);
    return PollModule;
}());
exports.PollModule = PollModule;
//# sourceMappingURL=poll.module.js.map