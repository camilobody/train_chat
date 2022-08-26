import memberService from "../services/member.service.js";
import usersService from "../services/users.services.js";
import channelService from "../services/channel.service.js";
import meetingService from "../services/meeting.service.js";
import messagesService from "../services/messages.service.js";
import channelHistoryService from "../services/channelHistory.service.js";
import tokenService from "../services/token.service.js";

export function insertbyflag({ flag, message }) {
  switch (flag) {
    case "insert_member":
      memberService.addMember(message);
      break;

    case "insert_user":
      usersService.addUsers(message);
      break;

    case "insert_channel":
      channelService.addChannel(message);
      break;

    case "insert_meeting":
      meetingService.addMeeting(message);
      break;

    case "insert_messages":
      messagesService.addMessages(message);
      break;

    case "update_statusmeeting":
      meetingService.addStatusMeeting(message);
      break;

    case "update_channel_user":
      channelService.updateChannel(message);
      break;

    case "insert_reassign":
      channelHistoryService.addReassing(message);
      break;

    case "update_user_status":
      usersService.updateStatusUser(message);
      break;

    case "insert_token":
      tokenService.insertToken(message);
      break;

    default:
      break;
  }
}
