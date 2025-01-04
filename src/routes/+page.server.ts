import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const VISITORS_FILE = join(process.cwd(), 'data', 'visitors.txt');

function loadVisitors(): Set<string> {
  try {
    if (existsSync(VISITORS_FILE)) {
      const content = readFileSync(VISITORS_FILE, 'utf-8');
      return new Set(content.split('\n')
        .filter(line => line.trim())
        .map(line => line.split(' - ')[0]));
    }
  } catch (error) {
    console.error('Error loading visitors:', error);
  }
  return new Set();
}

function saveVisitors(visitors: Set<string>) {
  try {
    writeFileSync(VISITORS_FILE, Array.from(visitors).join('\n'));
  } catch (error) {
    console.error('Error saving visitors:', error);
  }
}

const visitors = loadVisitors();

export const load: PageServerLoad = async ({ getClientAddress }: RequestEvent) => {
  const clientIP = getClientAddress();
  const timestamp = new Date().toISOString();

  if (!visitors.has(clientIP)) {
    visitors.add(clientIP);
    try {
      writeFileSync(VISITORS_FILE, `${clientIP} - ${timestamp}\n`, { flag: 'a' });
    } catch (error) {
      console.error('Error appending visitor:', error);
    }
  }

  return {
    visitorCount: visitors.size
  };
}; 