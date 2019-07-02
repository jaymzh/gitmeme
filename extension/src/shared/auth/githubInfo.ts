declare const chrome: any;

export interface GithubInfo {
  token: string | null;
  id: string | null;
  avatar: string | null;
}

export async function getGithubInfo(): Promise<GithubInfo> {
  return new Promise(resolve => {
    chrome.storage.sync.get(
      ["github_token", "github_id", "github_avatar"],
      function(results: any) {
        resolve({
          token: results.github_token || null,
          id: results.github_id || null,
          avatar: results.github_avatar || null
        });
      }
    );
  });
}

export async function setGithubToken(token: string) {
  return new Promise(resolve => {
    chrome.storage.sync.set({ github_token: token }, function() {
      resolve();
    });
  });
}

export async function setGithubUserId(userId: string, avatarUrl: string) {
  return new Promise(resolve => {
    console.log("setGithubUserId ", userId, avatarUrl);
    chrome.storage.sync.set(
      { github_id: userId, github_avatar: avatarUrl },
      function() {
        resolve();
      }
    );
  });
}