import {
  DisplayProcessor,
  SpecReporter
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;

function getTime() {
  var now = new Date();
  return now.getHours() + ':' +
    now.getMinutes() + ':' +
    now.getSeconds() + ':' +
    now.getMilliseconds();
}

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return /*getTime() + ' - ' + */ `TypeScript - ${log}`;
    }
    // public displaySuite(result: any, log: string): string {
    //   return getTime() + ' - ' + log;
    // };
    
    // public displaySuccessfulSpec(result: any, log: string): string {
    //   return getTime() + ' - ' + log;
    // };
    
    // public displayFailedSpec(result: any, log: string): string {
    //   return getTime() + ' - ' + log;
    // };
    
    // public displayPendingSpec(result: any, log: string): string {
    //   return getTime() + ' - ' + log;
    // };
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    customProcessors: [CustomProcessor],
}));
